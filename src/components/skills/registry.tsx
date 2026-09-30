"use client";

import type { SkillConceptDescriptor } from "@/definitions";
import dynamic from "next/dynamic";

function ConceptLoading() {
  return (
    <p className="min-h-[24rem] animate-pulse rounded-lg border border-beige/10 bg-mainGreen/5 p-6 text-sm text-beige/50">
      Loading concept…
    </p>
  );
}

const descriptors: SkillConceptDescriptor[] = [
  {
    id: "009",
    label: "bento",
    blurb: "Four bento zones with a live proof inspector",
    component: dynamic(() => import("./Bento"), {
      ssr: true,
      loading: ConceptLoading,
    }),
  },
  {
    id: "010",
    label: "filter",
    blurb: "Domain presets, live search and cross-lighting",
    component: dynamic(() => import("./Filter"), {
      ssr: true,
      loading: ConceptLoading,
    }),
  },
  {
    id: "011",
    label: "architecture",
    blurb: "Full-stack tiers with a topology inspector",
    component: dynamic(() => import("./Architecture"), {
      ssr: true,
      loading: ConceptLoading,
    }),
  },
  {
    id: "012",
    label: "terminal",
    blurb: "Dual-pane deck with a live inspect terminal",
    component: dynamic(() => import("./Terminal"), {
      ssr: true,
      loading: ConceptLoading,
    }),
  },
  {
    id: "013",
    label: "shelves",
    blurb: "Category shelves with proof tooltips",
    component: dynamic(() => import("./Shelves"), {
      ssr: true,
      loading: ConceptLoading,
    }),
  },
  {
    id: "014",
    label: "proof map",
    blurb: "Skill wall with project cross-glow evidence",
    component: dynamic(() => import("./ProofMap"), {
      ssr: true,
      loading: ConceptLoading,
    }),
  },
  {
    id: "015",
    label: "physics",
    blurb: "Springy chip field with flip-to-detail",
    component: dynamic(() => import("./Physics"), {
      ssr: true,
      loading: ConceptLoading,
    }),
  },
  {
    id: "016",
    label: "orbit",
    blurb: "Category rings orbiting the headline",
    component: dynamic(() => import("./Orbit"), {
      ssr: true,
      loading: ConceptLoading,
    }),
  },
];

export const CONCEPT_LIST = descriptors;

export const CONCEPT_IDS = descriptors.map((d) => d.id);

export const CONCEPT_REGISTRY = Object.fromEntries(
  descriptors.map((d) => [d.id, d]),
) as Record<(typeof descriptors)[number]["id"], SkillConceptDescriptor>;
