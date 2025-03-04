// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Item in *home → Landing Buttons*
 */
export interface HomeDocumentDataLandingButtonsItem {
  /**
   * Button Text field in *home → Landing Buttons*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Front, Back, Etc etc.
   * - **API ID Path**: home.landing_buttons[].button_text
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  button_text: prismic.KeyTextField;
}

type HomeDocumentDataSlicesSlice = HeroSectionSlice;

/**
 * Content for home documents
 */
interface HomeDocumentData {
  /**
   * Hero Title field in *home*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: home.hero_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  hero_title: prismic.RichTextField;

  /**
   * Landing Buttons field in *home*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: home.landing_buttons[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  landing_buttons: prismic.GroupField<
    Simplify<HomeDocumentDataLandingButtonsItem>
  >;

  /**
   * Hero Description field in *home*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: home.hero_description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  hero_description: prismic.RichTextField;

  /**
   * Slice Zone field in *home*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: home.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<HomeDocumentDataSlicesSlice> /**
   * Meta Title field in *home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: home.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: home.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *home*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: home.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * home document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<HomeDocumentData>, "home", Lang>;

/**
 * Item in *Settings → navbar*
 */
export interface SettingsDocumentDataNavbarItem {
  /**
   * Navbar Link field in *Settings → navbar*
   *
   * - **Field Type**: Link
   * - **Placeholder**: Section Name
   * - **API ID Path**: settings.navbar[].navbar_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  navbar_link: prismic.LinkField<
    string,
    string,
    unknown,
    prismic.FieldState,
    never
  >;

  /**
   * Link ID field in *Settings → navbar*
   *
   * - **Field Type**: Text
   * - **Placeholder**: vision, mission, product, next
   * - **API ID Path**: settings.navbar[].link_id
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  link_id: prismic.KeyTextField;
}

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
  /**
   * Logo field in *Settings*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.logo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo: prismic.ImageField<never>;

  /**
   * navbar field in *Settings*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.navbar[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  navbar: prismic.GroupField<Simplify<SettingsDocumentDataNavbarItem>>;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<SettingsDocumentData>,
    "settings",
    Lang
  >;

export type AllDocumentTypes = HomeDocument | SettingsDocument;

/**
 * Item in *HeroSection → Default → Primary → Hero Buttons*
 */
export interface HeroSectionSliceDefaultPrimaryHeroButtonsItem {
  /**
   * Button Text field in *HeroSection → Default → Primary → Hero Buttons*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Warmth
   * - **API ID Path**: hero_section.default.primary.hero_buttons[].button_text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  button_text: prismic.RichTextField;
}

/**
 * Item in *HeroSection → Hero Vertical → Primary → Hero Buttons*
 */
export interface HeroSectionSliceHeroVerticalPrimaryHeroButtonsItem {
  /**
   * Button Text field in *HeroSection → Hero Vertical → Primary → Hero Buttons*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Warmth
   * - **API ID Path**: hero_section.heroVertical.primary.hero_buttons[].button_text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  button_text: prismic.RichTextField;
}

/**
 * Primary content in *HeroSection → Default → Primary*
 */
export interface HeroSectionSliceDefaultPrimary {
  /**
   * uid field in *HeroSection → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: hero_horizontal
   * - **API ID Path**: hero_section.default.primary.uid
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  uid: prismic.KeyTextField;

  /**
   * Hero Title field in *HeroSection → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: We gain Energy
   * - **API ID Path**: hero_section.default.primary.hero_title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  hero_title: prismic.RichTextField;

  /**
   * Hero Subtitle First field in *HeroSection → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: first active thermal glass facade
   * - **API ID Path**: hero_section.default.primary.hero_subtitle_first
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  hero_subtitle_first: prismic.RichTextField;

  /**
   * Hero Subtitle Second field in *HeroSection → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: managing energy-flows
   * - **API ID Path**: hero_section.default.primary.hero_subtitle_second
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  hero_subtitle_second: prismic.RichTextField;

  /**
   * Hero Buttons field in *HeroSection → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: hero_section.default.primary.hero_buttons[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  hero_buttons: prismic.GroupField<
    Simplify<HeroSectionSliceDefaultPrimaryHeroButtonsItem>
  >;

  /**
   * Hero Description field in *HeroSection → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero_section.default.primary.hero_description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  hero_description: prismic.RichTextField;

  /**
   * Toggle Button Text  field in *HeroSection → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Get Interactive
   * - **API ID Path**: hero_section.default.primary.toggle_button_text
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  toggle_button_text: prismic.KeyTextField;

  /**
   * Toggle Button Text active field in *HeroSection → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Go to Scrollmode
   * - **API ID Path**: hero_section.default.primary.toggle_button_text_active
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  toggle_button_text_active: prismic.KeyTextField;
}

/**
 * Default variation for HeroSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSectionSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<HeroSectionSliceDefaultPrimary>,
  never
>;

/**
 * Primary content in *HeroSection → Hero Vertical → Primary*
 */
export interface HeroSectionSliceHeroVerticalPrimary {
  /**
   * uid field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: hero_vertical
   * - **API ID Path**: hero_section.heroVertical.primary.uid
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  uid: prismic.KeyTextField;

  /**
   * Hero Title field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: We gain Energy
   * - **API ID Path**: hero_section.heroVertical.primary.hero_title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  hero_title: prismic.RichTextField;

  /**
   * Hero Subtitle First field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: first active thermal glass facade
   * - **API ID Path**: hero_section.heroVertical.primary.hero_subtitle_first
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  hero_subtitle_first: prismic.RichTextField;

  /**
   * Hero Subtitle Second field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: managing energy-flows
   * - **API ID Path**: hero_section.heroVertical.primary.hero_subtitle_second
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  hero_subtitle_second: prismic.RichTextField;

  /**
   * Hero Buttons field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: hero_section.heroVertical.primary.hero_buttons[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  hero_buttons: prismic.GroupField<
    Simplify<HeroSectionSliceHeroVerticalPrimaryHeroButtonsItem>
  >;

  /**
   * Hero Description field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero_section.heroVertical.primary.hero_description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  hero_description: prismic.RichTextField;

  /**
   * Toggle Button Text  field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Get Interactive
   * - **API ID Path**: hero_section.heroVertical.primary.toggle_button_text
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  toggle_button_text: prismic.KeyTextField;

  /**
   * Toggle Button Text active field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Go to Scrollmode
   * - **API ID Path**: hero_section.heroVertical.primary.toggle_button_text_active
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  toggle_button_text_active: prismic.KeyTextField;

  /**
   * Front Title field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero_section.heroVertical.primary.front_title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  front_title: prismic.RichTextField;

  /**
   * Front Text field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero_section.heroVertical.primary.front_text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  front_text: prismic.RichTextField;

  /**
   * Back Title field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero_section.heroVertical.primary.back_title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  back_title: prismic.RichTextField;

  /**
   * Back Text field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero_section.heroVertical.primary.back_text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  back_text: prismic.RichTextField;

  /**
   * Between Title field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero_section.heroVertical.primary.between_title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  between_title: prismic.RichTextField;

  /**
   * Between Text field in *HeroSection → Hero Vertical → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero_section.heroVertical.primary.between_text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  between_text: prismic.RichTextField;
}

/**
 * Hero Vertical variation for HeroSection Slice
 *
 * - **API ID**: `heroVertical`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSectionSliceHeroVertical = prismic.SharedSliceVariation<
  "heroVertical",
  Simplify<HeroSectionSliceHeroVerticalPrimary>,
  never
>;

/**
 * Slice variation for *HeroSection*
 */
type HeroSectionSliceVariation =
  | HeroSectionSliceDefault
  | HeroSectionSliceHeroVertical;

/**
 * HeroSection Shared Slice
 *
 * - **API ID**: `hero_section`
 * - **Description**: HeroSection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSectionSlice = prismic.SharedSlice<
  "hero_section",
  HeroSectionSliceVariation
>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      HomeDocument,
      HomeDocumentData,
      HomeDocumentDataLandingButtonsItem,
      HomeDocumentDataSlicesSlice,
      SettingsDocument,
      SettingsDocumentData,
      SettingsDocumentDataNavbarItem,
      AllDocumentTypes,
      HeroSectionSlice,
      HeroSectionSliceDefaultPrimaryHeroButtonsItem,
      HeroSectionSliceDefaultPrimary,
      HeroSectionSliceHeroVerticalPrimaryHeroButtonsItem,
      HeroSectionSliceHeroVerticalPrimary,
      HeroSectionSliceVariation,
      HeroSectionSliceDefault,
      HeroSectionSliceHeroVertical,
    };
  }
}
