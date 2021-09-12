import React, { useState } from "react";

const useInput = (defaultValue?: string) => {
  const [value, setValue] = useState<string | number | undefined>(
    defaultValue || ""
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof e === "string" || typeof e === "number") {
      setValue(e);
    } else if (e.target) {
      setValue(e.target.value);
    }
  };

  return {
    inputProps: {
      value,
      onChange,
    },
    value,
    setValue,
  };
};

export default useInput;
