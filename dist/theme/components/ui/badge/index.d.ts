import type { VariantProps } from "class-variance-authority";
export { default as Badge } from "./Badge.vue";
export declare const badgeVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type BadgeVariants = VariantProps<typeof badgeVariants>;
