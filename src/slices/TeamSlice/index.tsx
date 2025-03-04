import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TeamSlice`.
 */
export type TeamSliceProps = SliceComponentProps<Content.TeamSliceSlice>;

/**
 * Component for "TeamSlice" Slices.
 */
const TeamSlice: FC<TeamSliceProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for team_slice (variation: {slice.variation}) Slices
    </section>
  );
};

export default TeamSlice;
