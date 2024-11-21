import * as React from "react";
import { SelectInput, useField, useWatchForm } from "payload/components/forms";
import { useEffect, useState } from "react";

export const CustomRootCategoryComponent = ({ path, label }) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = useState([]);

  const { getDataByPath } = useWatchForm();
  const subcategoryref = getDataByPath("subcategoryref");
  const fetchOptions = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const categoryOptions = [data].map((category) => {
        return {
          label: `${category.categoryRef.title}`,
          value: category.categoryRef.id,
        };
      });
      setValue(data.categoryRef.id);
      setOptions(
        categoryOptions.sort((a, b) => a.label.localeCompare(b.label))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    let url = `http://localhost:3000/api/subcategory/${subcategoryref}`;
    if (subcategoryref) {
      fetchOptions(url);
    }
  }, [subcategoryref]);
  return (
    <div className="field-type">
      <label className="field-label">{label}</label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  );
};
