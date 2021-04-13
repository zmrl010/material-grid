import { DEFAULT_COMPONENTS } from "./components/const";

export type GridComponents = typeof DEFAULT_COMPONENTS;

export type BaseType = Record<string, unknown>;

export type IdType = { id: number } & BaseType;
