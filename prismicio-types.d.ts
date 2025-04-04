// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Content for Background Image documents
 */
interface BackgroundImageDocumentData {
  /**
   * Backgorund Logo field in *Background Image*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: background_image.backgorund_logo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  backgorund_logo: prismic.ImageField<never>;
}

/**
 * Background Image document from Prismic
 *
 * - **API ID**: `background_image`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BackgroundImageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<BackgroundImageDocumentData>,
    "background_image",
    Lang
  >;

/**
 * Content for Footer documents
 */
interface FooterDocumentData {
  /**
   * Logo field in *Footer*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.logo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo: prismic.ImageField<never>;

  /**
   * Address Name field in *Footer*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: FLOWX
   * - **API ID Path**: footer.address_name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  address_name: prismic.RichTextField;

  /**
   * Address Street field in *Footer*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Seefeldstrasse 224
   * - **API ID Path**: footer.address_street
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  address_street: prismic.RichTextField;

  /**
   * Address City field in *Footer*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.address_city
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  address_city: prismic.RichTextField;

  /**
   * Phone field in *Footer*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.phone
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  phone: prismic.RichTextField;

  /**
   * Email field in *Footer*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.email
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  email: prismic.RichTextField;
}

/**
 * Footer document from Prismic
 *
 * - **API ID**: `footer`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FooterDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<FooterDocumentData>,
    "footer",
    Lang
  >;

type HomeDocumentDataSlicesSlice =
  | ReferenceSliceSlice
  | VisionSliceSlice
  | TeamSliceSlice
  | SolutionSliceSlice
  | MissionSliceSlice
  | HeroSectionSlice;

/**
 * Content for home documents
 */
interface HomeDocumentData {
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

export type AllDocumentTypes =
  | BackgroundImageDocument
  | FooterDocument
  | HomeDocument
  | SettingsDocument;

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

/**
 * Item in *MissionSlice → Default → Primary → Mission Group Fields*
 */
export interface MissionSliceSliceDefaultPrimaryMissionGroupFieldsItem {
  /**
   * icon field in *MissionSlice → Default → Primary → Mission Group Fields*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: mission_slice.default.primary.mission_group_fields[].icon
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  icon: prismic.ImageField<never>;

  /**
   * Has Title field in *MissionSlice → Default → Primary → Mission Group Fields*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: mission_slice.default.primary.mission_group_fields[].has_title
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  has_title: prismic.BooleanField;

  /**
   * Group Title field in *MissionSlice → Default → Primary → Mission Group Fields*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: smart, energy efficient etc.
   * - **API ID Path**: mission_slice.default.primary.mission_group_fields[].group_title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  group_title: prismic.RichTextField;

  /**
   * Has Text field in *MissionSlice → Default → Primary → Mission Group Fields*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: mission_slice.default.primary.mission_group_fields[].has_text
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  has_text: prismic.BooleanField;

  /**
   * Group Text field in *MissionSlice → Default → Primary → Mission Group Fields*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: mission_slice.default.primary.mission_group_fields[].group_text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  group_text: prismic.RichTextField;

  /**
   * Has Link field in *MissionSlice → Default → Primary → Mission Group Fields*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: mission_slice.default.primary.mission_group_fields[].has_link
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  has_link: prismic.BooleanField;

  /**
   * Link field in *MissionSlice → Default → Primary → Mission Group Fields*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: mission_slice.default.primary.mission_group_fields[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *MissionSlice → Default → Primary*
 */
export interface MissionSliceSliceDefaultPrimary {
  /**
   * Title field in *MissionSlice → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: our mission
   * - **API ID Path**: mission_slice.default.primary.title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.RichTextField;

  /**
   * Mission Group Fields field in *MissionSlice → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: mission_slice.default.primary.mission_group_fields[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  mission_group_fields: prismic.GroupField<
    Simplify<MissionSliceSliceDefaultPrimaryMissionGroupFieldsItem>
  >;

  /**
   * Is Next field in *MissionSlice → Default → Primary*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: mission_slice.default.primary.is_next
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  is_next: prismic.BooleanField;
}

/**
 * Default variation for MissionSlice Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MissionSliceSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<MissionSliceSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *MissionSlice*
 */
type MissionSliceSliceVariation = MissionSliceSliceDefault;

/**
 * MissionSlice Shared Slice
 *
 * - **API ID**: `mission_slice`
 * - **Description**: MissionSlice
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MissionSliceSlice = prismic.SharedSlice<
  "mission_slice",
  MissionSliceSliceVariation
>;

/**
 * Item in *ReferenceSlice → Default → Primary → Reference Group*
 */
export interface ReferenceSliceSliceDefaultPrimaryReferenceGroupItem {
  /**
   * Reference Image field in *ReferenceSlice → Default → Primary → Reference Group*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: reference_slice.default.primary.reference_group[].reference_image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  reference_image: prismic.ImageField<never>;

  /**
   * Reference Name field in *ReferenceSlice → Default → Primary → Reference Group*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: reference_slice.default.primary.reference_group[].reference_name
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  reference_name: prismic.RichTextField;

  /**
   * Reference Link field in *ReferenceSlice → Default → Primary → Reference Group*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: reference_slice.default.primary.reference_group[].reference_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  reference_link: prismic.LinkField<
    string,
    string,
    unknown,
    prismic.FieldState,
    never
  >;
}

/**
 * Primary content in *ReferenceSlice → Default → Primary*
 */
export interface ReferenceSliceSliceDefaultPrimary {
  /**
   * Title field in *ReferenceSlice → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: References
   * - **API ID Path**: reference_slice.default.primary.title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  title: prismic.RichTextField;

  /**
   * Reference Group field in *ReferenceSlice → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: reference_slice.default.primary.reference_group[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  reference_group: prismic.GroupField<
    Simplify<ReferenceSliceSliceDefaultPrimaryReferenceGroupItem>
  >;
}

/**
 * Default variation for ReferenceSlice Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ReferenceSliceSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<ReferenceSliceSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *ReferenceSlice*
 */
type ReferenceSliceSliceVariation = ReferenceSliceSliceDefault;

/**
 * ReferenceSlice Shared Slice
 *
 * - **API ID**: `reference_slice`
 * - **Description**: ReferenceSlice
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ReferenceSliceSlice = prismic.SharedSlice<
  "reference_slice",
  ReferenceSliceSliceVariation
>;

/**
 * Item in *SolutionSlice → Default → Primary → Solution Sections*
 */
export interface SolutionSliceSliceDefaultPrimarySolutionSectionsItem {
  /**
   * Solution Side field in *SolutionSlice → Default → Primary → Solution Sections*
   *
   * - **Field Type**: Text
   * - **Placeholder**: right, left, spaced
   * - **API ID Path**: solution_slice.default.primary.solution_sections[].solution_side
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  solution_side: prismic.KeyTextField;

  /**
   * Solution Subtitle First field in *SolutionSlice → Default → Primary → Solution Sections*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: solution_slice.default.primary.solution_sections[].solution_subtitle_first
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  solution_subtitle_first: prismic.RichTextField;

  /**
   * Solution Text First field in *SolutionSlice → Default → Primary → Solution Sections*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: solution_slice.default.primary.solution_sections[].solution_text_first
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  solution_text_first: prismic.RichTextField;

  /**
   * Solution Subtitle Second field in *SolutionSlice → Default → Primary → Solution Sections*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: solution_slice.default.primary.solution_sections[].solution_subtitle_second
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  solution_subtitle_second: prismic.RichTextField;

  /**
   * Solution Text Second field in *SolutionSlice → Default → Primary → Solution Sections*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: solution_slice.default.primary.solution_sections[].solution_text_second
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  solution_text_second: prismic.RichTextField;

  /**
   * Window State Setter field in *SolutionSlice → Default → Primary → Solution Sections*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: solution_slice.default.primary.solution_sections[].window_state_setter
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  window_state_setter: prismic.KeyTextField;
}

/**
 * Primary content in *SolutionSlice → Default → Primary*
 */
export interface SolutionSliceSliceDefaultPrimary {
  /**
   * Solution Title field in *SolutionSlice → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Solution
   * - **API ID Path**: solution_slice.default.primary.solution_title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  solution_title: prismic.RichTextField;

  /**
   * Solution Sections field in *SolutionSlice → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: solution_slice.default.primary.solution_sections[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  solution_sections: prismic.GroupField<
    Simplify<SolutionSliceSliceDefaultPrimarySolutionSectionsItem>
  >;
}

/**
 * Default variation for SolutionSlice Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SolutionSliceSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<SolutionSliceSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *SolutionSlice*
 */
type SolutionSliceSliceVariation = SolutionSliceSliceDefault;

/**
 * SolutionSlice Shared Slice
 *
 * - **API ID**: `solution_slice`
 * - **Description**: SolutionSlice
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SolutionSliceSlice = prismic.SharedSlice<
  "solution_slice",
  SolutionSliceSliceVariation
>;

/**
 * Item in *TeamSlice → Default → Primary → Team Member*
 */
export interface TeamSliceSliceDefaultPrimaryTeamMemberItem {
  /**
   * Member Image field in *TeamSlice → Default → Primary → Team Member*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: team_slice.default.primary.team_member[].member_image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  member_image: prismic.ImageField<never>;

  /**
   * Member Name field in *TeamSlice → Default → Primary → Team Member*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: team_slice.default.primary.team_member[].member_name
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  member_name: prismic.RichTextField;

  /**
   * member Email field in *TeamSlice → Default → Primary → Team Member*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: team_slice.default.primary.team_member[].member_email
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  member_email: prismic.LinkField<
    string,
    string,
    unknown,
    prismic.FieldState,
    never
  >;

  /**
   * Member CV field in *TeamSlice → Default → Primary → Team Member*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: team_slice.default.primary.team_member[].member_cv
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  member_cv: prismic.LinkField<
    string,
    string,
    unknown,
    prismic.FieldState,
    never
  >;

  /**
   * Linkedin Logo field in *TeamSlice → Default → Primary → Team Member*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: team_slice.default.primary.team_member[].linkedin_logo
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  linkedin_logo: prismic.ImageField<never>;

  /**
   * Linkedin Link field in *TeamSlice → Default → Primary → Team Member*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: team_slice.default.primary.team_member[].linkedin_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  linkedin_link: prismic.LinkField<
    string,
    string,
    unknown,
    prismic.FieldState,
    never
  >;
}

/**
 * Primary content in *TeamSlice → Default → Primary*
 */
export interface TeamSliceSliceDefaultPrimary {
  /**
   * Team Title field in *TeamSlice → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: Team
   * - **API ID Path**: team_slice.default.primary.team_title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  team_title: prismic.RichTextField;

  /**
   * Team Member field in *TeamSlice → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: team_slice.default.primary.team_member[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  team_member: prismic.GroupField<
    Simplify<TeamSliceSliceDefaultPrimaryTeamMemberItem>
  >;
}

/**
 * Default variation for TeamSlice Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TeamSliceSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<TeamSliceSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *TeamSlice*
 */
type TeamSliceSliceVariation = TeamSliceSliceDefault;

/**
 * TeamSlice Shared Slice
 *
 * - **API ID**: `team_slice`
 * - **Description**: TeamSlice
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TeamSliceSlice = prismic.SharedSlice<
  "team_slice",
  TeamSliceSliceVariation
>;

/**
 * Primary content in *VisionSlice → Default → Primary*
 */
export interface VisionSliceSliceDefaultPrimary {
  /**
   * Vision Image field in *VisionSlice → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: vision_slice.default.primary.vision_image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  vision_image: prismic.ImageField<never>;

  /**
   * Vision Title field in *VisionSlice → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: our vision
   * - **API ID Path**: vision_slice.default.primary.vision_title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  vision_title: prismic.RichTextField;

  /**
   * Vision Text field in *VisionSlice → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: vision_slice.default.primary.vision_text
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  vision_text: prismic.RichTextField;

  /**
   * Vision URL field in *VisionSlice → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: Prismic -> Files
   * - **API ID Path**: vision_slice.default.primary.vision_url
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  vision_url: prismic.KeyTextField;

  /**
   * Vision Text Second field in *VisionSlice → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: vision_slice.default.primary.vision_text_second
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  vision_text_second: prismic.RichTextField;
}

/**
 * Default variation for VisionSlice Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type VisionSliceSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<VisionSliceSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *VisionSlice*
 */
type VisionSliceSliceVariation = VisionSliceSliceDefault;

/**
 * VisionSlice Shared Slice
 *
 * - **API ID**: `vision_slice`
 * - **Description**: VisionSlice
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type VisionSliceSlice = prismic.SharedSlice<
  "vision_slice",
  VisionSliceSliceVariation
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
      BackgroundImageDocument,
      BackgroundImageDocumentData,
      FooterDocument,
      FooterDocumentData,
      HomeDocument,
      HomeDocumentData,
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
      MissionSliceSlice,
      MissionSliceSliceDefaultPrimaryMissionGroupFieldsItem,
      MissionSliceSliceDefaultPrimary,
      MissionSliceSliceVariation,
      MissionSliceSliceDefault,
      ReferenceSliceSlice,
      ReferenceSliceSliceDefaultPrimaryReferenceGroupItem,
      ReferenceSliceSliceDefaultPrimary,
      ReferenceSliceSliceVariation,
      ReferenceSliceSliceDefault,
      SolutionSliceSlice,
      SolutionSliceSliceDefaultPrimarySolutionSectionsItem,
      SolutionSliceSliceDefaultPrimary,
      SolutionSliceSliceVariation,
      SolutionSliceSliceDefault,
      TeamSliceSlice,
      TeamSliceSliceDefaultPrimaryTeamMemberItem,
      TeamSliceSliceDefaultPrimary,
      TeamSliceSliceVariation,
      TeamSliceSliceDefault,
      VisionSliceSlice,
      VisionSliceSliceDefaultPrimary,
      VisionSliceSliceVariation,
      VisionSliceSliceDefault,
    };
  }
}
