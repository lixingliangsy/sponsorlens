export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "SponsorLens",
  slug: "sponsorlens",
  tagline: "Know if a brand deal is fair before you sign.",
  description: "Enter a sponsorship offer (value, deliverables, platform, audience size); get a fair-rate benchmark and an FTC disclosure risk check. For full-time creators and agencies evaluating brand deals blind.",
  toolTitle: "Benchmark this deal",
  resultLabel: "Deal report",
  ctaLabel: "Benchmark",
  features: [
  "Fair-rate benchmark",
  "FTC disclosure check",
  "Rate-card builder",
  "Agency dashboard (Team)"
],
  inputs: [
  {
    "key": "dealValue",
    "label": "Deal value (USD)",
    "type": "input",
    "placeholder": "e.g. 2500"
  },
  {
    "key": "deliverables",
    "label": "Deliverables (one per line)",
    "type": "textarea",
    "placeholder": "1 dedicated Reel\\n2 Stories\\n1 newsletter mention"
  },
  {
    "key": "platform",
    "label": "Platform",
    "type": "select",
    "options": [
      "YouTube",
      "Instagram",
      "TikTok",
      "Twitch",
      "X"
    ]
  },
  {
    "key": "followers",
    "label": "Followers (e.g. 50000)",
    "type": "input",
    "placeholder": "e.g. 50000"
  }
] as InputField[],
  systemPrompt: "You are a creator-economy deal analyst. Given a sponsorship offer (value, deliverables, platform, audience), benchmark the $/1000-followers rate against market norms and flag FTC disclosure risks.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "3 deals/mo"
  },
  {
    "tier": "Pro",
    "price": "$29/mo",
    "desc": "Unlimited benchmarking + rate cards"
  },
  {
    "tier": "Team",
    "price": "$79/mo",
    "desc": "Agency multi-creator dashboard"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const val = parseFloat(inputs['dealValue']) || 0
  const fol = parseFloat(inputs['followers']) || 0
  const plat = inputs['platform'] || 'Instagram'
  const dels = (inputs['deliverables'] || '').split(/\n/).map(s => s.trim()).filter(Boolean)
  if (!val || !fol) return 'Enter deal value and follower count to benchmark.'
  const k = fol / 1000
  const rate = val / k
  const norm = { YouTube: 18, Instagram: 15, TikTok: 12, Twitch: 20, X: 10 }[plat] || 15
  let out = 'SPONSORSHIP DEAL - ' + plat + '\n\n'
  out += 'Deal value: $' + val.toFixed(0) + '\n'
  out += 'Audience: ' + fol.toLocaleString() + ' (' + k.toFixed(1) + 'K)\n'
  out += 'Rate: $' + rate.toFixed(1) + ' / 1K followers\n'
  out += 'Market norm: ~$' + norm + ' / 1K\n'
  out += (rate >= norm ? '[OK] At or above market.' : '[WATCH] Below market by ~$' + (norm - rate).toFixed(1) + ' / 1K - negotiate up.') + '\n'
  out += 'Deliverables: ' + dels.length + ' item(s)\n'
  out += '\nFTC risk: ' + (dels.length ? 'Add clear "paid partnership" label on every post.' : 'List deliverables to assess.') + '\n'
  out += '\n--- (Mock benchmark. Pro adds rate-card history + multi-creator dashboard.)'
  return out
}
}
