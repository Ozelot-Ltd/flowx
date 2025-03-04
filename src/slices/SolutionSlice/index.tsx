import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `SolutionSlice`.
 */
export type SolutionSliceProps =
  SliceComponentProps<Content.SolutionSliceSlice>;

/**
 * Component for "SolutionSlice" Slices.
 */
const SolutionSlice: FC<SolutionSliceProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for solution_slice (variation: {slice.variation})
      Slices
    </section>
  );
};

export default SolutionSlice;
