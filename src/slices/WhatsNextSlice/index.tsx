import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `WhatsNextSlice`.
 */
export type WhatsNextSliceProps =
  SliceComponentProps<Content.WhatsNextSliceSlice>;

/**
 * Component for "WhatsNextSlice" Slices.
 */
const WhatsNextSlice: FC<WhatsNextSliceProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for whats_next_slice (variation: {slice.variation})
      Slices
    </section>
  );
};

export default WhatsNextSlice;
