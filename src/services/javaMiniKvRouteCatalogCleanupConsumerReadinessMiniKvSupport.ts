export const MINI_KV_POST_CLOSEOUT_RELEASES = [202, 203, 204, 205, 206, 207, 208, 209] as const;

export type MiniKvPostCloseoutReleaseVersion =
  | "v202"
  | "v203"
  | "v204"
  | "v205"
  | "v206"
  | "v207"
  | "v208"
  | "v209";

export const MINI_KV_EXPECTED_DIGESTS: Record<MiniKvPostCloseoutReleaseVersion, string> = {
  v202: "fnv1a64:cd0c634b2fc44eff",
  v203: "fnv1a64:bed1ac036b8f548e",
  v204: "fnv1a64:670b62f7c203b814",
  v205: "fnv1a64:c00dd62f28564fed",
  v206: "fnv1a64:1e5f3dc941b1a90e",
  v207: "fnv1a64:16dd9ba05e5b3fe4",
  v208: "fnv1a64:ef5973d3894665a6",
  v209: "fnv1a64:6c283479e8bb1988",
};
