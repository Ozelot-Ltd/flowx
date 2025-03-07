import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ReferenceSlice`.
 */
export type ReferenceSliceProps =
  SliceComponentProps<Content.ReferenceSliceSlice>;

/**
 * Component for "ReferenceSlice" Slices.
 */
const ReferenceSlice: FC<ReferenceSliceProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for reference_slice (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ReferenceSlice;
