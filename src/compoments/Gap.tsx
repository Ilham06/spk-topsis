import { height } from "@mui/system";
import React from "react";

type GapType = {
  width: string | number;
  height: string | number;
};

const Gap = (props: GapType) => {
  const { height, width } = props;
  return <div style={{ height: height, width: width }} />;
};

export default Gap;
