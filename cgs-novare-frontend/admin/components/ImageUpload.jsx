// admin/components/ImageUpload.jsx
import { Button } from "@mui/material";

export default function ImageUpload({ onChange, multiple = false }) {
  return (
    <Button variant="outlined" component="label">
      Upload Images
      <input
        hidden
        type="file"
        multiple={multiple}
        accept="image/*"
        onChange={onChange}
      />
    </Button>
  );
}
