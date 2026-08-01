'use client';

import {
    siReact, siNextdotjs, siTypescript, siTailwindcss, siVuedotjs,
    siNodedotjs, siPython, siFastapi, siGo, siGraphql,
    siPostgresql, siMongodb, siRedis, siMysql, siSupabase,
    siDocker, siKubernetes, siGooglecloud, siCloudflare, siVercel,
    siTensorflow, siPytorch, siLangchain, siHuggingface, siAnthropic, siGooglegemini,
    siWhatsapp, siFlutter, siStripe, siExpo, siJavascript, siGithub,
} from 'simple-icons';

type SimpleIcon = { title: string; hex: string; path: string };

/**
 * Curated registry of the stack we actually build on.
 * Every entry is a real, official brand mark — no emoji stand-ins.
 * (AWS, OpenAI and LinkedIn marks were withdrawn from simple-icons
 * upstream, so those appear as text badges rather than fake logos.)
 */
export const TECH_REGISTRY = {
    react: siReact,
    nextjs: siNextdotjs,
    typescript: siTypescript,
    javascript: siJavascript,
    tailwind: siTailwindcss,
    vue: siVuedotjs,
    node: siNodedotjs,
    python: siPython,
    fastapi: siFastapi,
    go: siGo,
    graphql: siGraphql,
    postgres: siPostgresql,
    mongodb: siMongodb,
    redis: siRedis,
    mysql: siMysql,
    supabase: siSupabase,
    docker: siDocker,
    kubernetes: siKubernetes,
    gcp: siGooglecloud,
    cloudflare: siCloudflare,
    vercel: siVercel,
    tensorflow: siTensorflow,
    pytorch: siPytorch,
    langchain: siLangchain,
    huggingface: siHuggingface,
    anthropic: siAnthropic,
    gemini: siGooglegemini,
    whatsapp: siWhatsapp,
    flutter: siFlutter,
    stripe: siStripe,
    expo: siExpo,
    github: siGithub,
} satisfies Record<string, SimpleIcon>;

export type TechKey = keyof typeof TECH_REGISTRY;

interface TechIconProps {
    name: TechKey;
    className?: string;
    /** Render in the brand's own colour instead of inheriting currentColor. */
    colored?: boolean;
    size?: number;
}

/**
 * Brand marks render monochrome by default and take their brand colour on
 * hover (see `.tech-tile:hover` usage). Full-colour logos in a dense grid
 * read as visual noise; monochrome keeps the grid calm and legible in both
 * themes, and the colour shift becomes the hover reward.
 */
const TechIcon = ({ name, className = '', colored = false, size = 24 }: TechIconProps) => {
    const icon = TECH_REGISTRY[name];
    if (!icon) return null;

    return (
        <svg
            role="img"
            aria-label={icon.title}
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className={className}
            fill={colored ? `#${icon.hex}` : 'currentColor'}
        >
            <path d={icon.path} />
        </svg>
    );
};

export const techBrandColor = (name: TechKey) => `#${TECH_REGISTRY[name].hex}`;
export const techTitle = (name: TechKey) => TECH_REGISTRY[name].title;

export default TechIcon;
