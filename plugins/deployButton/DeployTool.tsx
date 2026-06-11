import { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
} from '@sanity/ui';
import { RocketIcon, ChevronRightIcon } from '@sanity/icons';

type Target = 'staging' | 'production';
type DeployState = 'idle' | 'deploying' | 'success' | 'error';

// Both buttons POST to the same Netlify Function URL — the function picks the
// right build hook from the JSON body { target }.
const FUNCTION_URL =
  (process.env.SANITY_STUDIO_DEPLOY_FUNCTION_URL as string | undefined) ||
  '/.netlify/functions/trigger-deploy';

const SECRET =
  (process.env.SANITY_STUDIO_DEPLOY_HOOK_SECRET as string | undefined) || '';

// Per-target last-deploy keys so the two timestamps don't collide.
const LAST_DEPLOY_KEYS: Record<Target, string> = {
  staging: 'aos_last_deploy_staging',
  production: 'aos_last_deploy_production',
};

function readTimestamp(target: Target): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(LAST_DEPLOY_KEYS[target]);
}

function writeTimestamp(target: Target, timestamp: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LAST_DEPLOY_KEYS[target], timestamp);
}

function formatTimestamp(ts: string | null) {
  if (!ts) return null;
  return new Date(ts).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function DeployTool() {
  // State per target so a click on one doesn't block the other.
  const [stagingState, setStagingState] = useState<DeployState>('idle');
  const [stagingMsg, setStagingMsg] = useState('');
  const [stagingLast, setStagingLast] = useState<string | null>(() => readTimestamp('staging'));

  const [productionState, setProductionState] = useState<DeployState>('idle');
  const [productionMsg, setProductionMsg] = useState('');
  const [productionLast, setProductionLast] = useState<string | null>(() => readTimestamp('production'));

  async function deploy(target: Target) {
    const isProd = target === 'production';
    const setState = isProd ? setProductionState : setStagingState;
    const setMsg = isProd ? setProductionMsg : setStagingMsg;
    const setLast = isProd ? setProductionLast : setStagingLast;
    const currentState = isProd ? productionState : stagingState;

    if (currentState === 'deploying') return;

    const confirmText = isProd
      ? '⚠ This will deploy to PRODUCTION (live site). Each production deploy uses 15 Netlify build credits — out of ~300/month. Are you sure?'
      : 'This will trigger a staging branch deploy at the staging-... URL. Staging deploys are free. Continue?';

    if (!window.confirm(confirmText)) return;

    setState('deploying');
    setMsg('');

    try {
      const res = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-deploy-secret': SECRET },
        body: JSON.stringify({ target }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}) as { error?: string });
        throw new Error((data as { error?: string }).error ?? `HTTP ${res.status}`);
      }

      const data = (await res.json()) as { timestamp?: string };
      const timestamp = data.timestamp ?? new Date().toISOString();
      writeTimestamp(target, timestamp);
      setLast(timestamp);
      setState('success');
      setMsg(
        isProd
          ? 'Production deploy triggered. Live site will update in 1–3 minutes.'
          : 'Staging deploy triggered. Branch URL will update in 1–3 minutes.'
      );
      setTimeout(() => setState('idle'), 8000);
    } catch (err) {
      setState('error');
      setMsg(err instanceof Error ? err.message : String(err));
    }
  }

  const stagingFormatted = formatTimestamp(stagingLast);
  const productionFormatted = formatTimestamp(productionLast);

  return (
    <Box padding={4}>
      <Stack space={5}>
        <Stack space={3}>
          <Heading size={2}>Deploy Site</Heading>
          <Text size={1} muted>
            Make all your CMS changes first, then deploy to publish them. Staging
            is for previewing changes risk-free; production updates the live site
            and uses Netlify build credits.
          </Text>
        </Stack>

        {/* ── Staging ──────────────────────────────────────────────── */}
        <Card padding={4} radius={2} tone="primary" border>
          <Stack space={4}>
            <Flex align="center" gap={2}>
              <Heading size={1}>Staging</Heading>
              <Badge tone="positive">Free</Badge>
            </Flex>
            <Text size={1} muted>
              Triggers a branch build on the <code>staging</code> branch. Preview
              at the staging-... Netlify URL. No build credits used.
            </Text>

            {stagingFormatted && (
              <Text size={1} muted>
                Last triggered from this browser: <strong>{stagingFormatted}</strong>
              </Text>
            )}

            <Flex gap={3} align="center" wrap="wrap">
              <Button
                icon={stagingState === 'deploying' ? Spinner : ChevronRightIcon}
                text={stagingState === 'deploying' ? 'Triggering…' : 'Deploy Staging'}
                tone="primary"
                disabled={stagingState === 'deploying'}
                onClick={() => deploy('staging')}
                fontSize={2}
                padding={3}
              />
              {stagingState === 'success' && <Badge tone="positive">Triggered</Badge>}
              {stagingState === 'error' && <Badge tone="critical">Error</Badge>}
            </Flex>

            {stagingMsg && (
              <Card padding={3} radius={2} border tone={stagingState === 'error' ? 'critical' : 'positive'}>
                <Text size={1}>{stagingMsg}</Text>
              </Card>
            )}
          </Stack>
        </Card>

        {/* ── Production ─────────────────────────────────────────── */}
        <Card padding={4} radius={2} tone="caution" border>
          <Stack space={4}>
            <Flex align="center" gap={2}>
              <Heading size={1}>Production</Heading>
              <Badge tone="caution">15 credits</Badge>
            </Flex>
            <Text size={1} muted>
              Updates the live site at the production URL. Each deploy uses 15 of
              your ~300 monthly Netlify credits — use sparingly. Pure CMS edits do
              not require a deploy (the site fetches Sanity content at runtime).
            </Text>

            {productionFormatted && (
              <Text size={1} muted>
                Last triggered from this browser: <strong>{productionFormatted}</strong>
              </Text>
            )}

            <Flex gap={3} align="center" wrap="wrap">
              <Button
                icon={productionState === 'deploying' ? Spinner : RocketIcon}
                text={productionState === 'deploying' ? 'Triggering…' : 'Deploy Production'}
                tone="critical"
                disabled={productionState === 'deploying'}
                onClick={() => deploy('production')}
                fontSize={2}
                padding={3}
              />
              {productionState === 'success' && <Badge tone="positive">Triggered</Badge>}
              {productionState === 'error' && <Badge tone="critical">Error</Badge>}
            </Flex>

            {productionMsg && (
              <Card padding={3} radius={2} border tone={productionState === 'error' ? 'critical' : 'positive'}>
                <Text size={1}>{productionMsg}</Text>
              </Card>
            )}
          </Stack>
        </Card>

        {/* ── Help ─────────────────────────────────────────────── */}
        <Card padding={4} radius={2} tone="transparent" border>
          <Stack space={3}>
            <Text size={1} weight="semibold">
              When to deploy
            </Text>
            <Stack space={2}>
              <Text size={1} muted>
                • Pure Sanity content edits → just publish. The site fetches content
                live; no deploy needed.
              </Text>
              <Text size={1} muted>
                • Need to verify changes look right end-to-end → <strong>Deploy Staging</strong>.
              </Text>
              <Text size={1} muted>
                • Staging looks good, ready to go live → <strong>Deploy Production</strong>.
              </Text>
              <Text size={1} muted>
                • Batch multiple changes before deploying — fewer credits used.
              </Text>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
