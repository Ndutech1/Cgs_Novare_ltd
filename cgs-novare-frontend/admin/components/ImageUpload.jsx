//cgs-novare-frontend/admin/components/ImageUpload.jsx
import { Button } from "@mui/material";

export default function ImageUpload({ onChange }) {
  return (
    <Button variant="outlined" component="label">
      Upload Image
      <input hidden type="file" onChange={onChange} />
    </Button>
  );
}
