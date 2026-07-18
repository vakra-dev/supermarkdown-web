import { ToolConfig } from './registry';

export function generateFaqSchema(tool: ToolConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateWebAppSchema(tool: ToolConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.h1,
    description: tool.description,
    url: `https://supermarkdown.dev/tools/${tool.slug}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function generateHowToSchema(tool: ToolConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Use ${tool.h1}`,
    description: tool.description,
    step: tool.howTo.map((item, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: item.step,
      text: item.detail,
    })),
  };
}
