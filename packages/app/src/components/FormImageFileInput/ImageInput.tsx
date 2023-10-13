import { useDropzone } from "react-dropzone";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Button, Icon, Image } from "semantic-ui-react";
import styled from "styled-components";
import BlockContent from "./BlockContent";

const ImageInput = ({
  field,
}: {
  field: ControllerRenderProps<FieldValues, string>;
}) => {
  const { onChange, value } = field;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (images: File[]) => {
      const [image] = images;
      onChange({
        file: image,
        preview: URL.createObjectURL(image),
      });
    },
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  return (
    <>
      <DropZoneWrapper
        {...getRootProps()}
        style={{ ...(isDragActive && { opacity: 0.72 }) }}
      >
        <input {...getInputProps()} />
        <BlockContent />
      </DropZoneWrapper>
      {value && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Image
            size="medium"
            avatar
            src={value.preview}
            onLoad={() => URL.revokeObjectURL(value.preview)}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              onChange(null);
            }}
            icon
            circular
            basic
            size="small"
            style={{
              height: "5%",
            }}
          >
            <Icon name="close" />
          </Button>
        </div>
      )}
    </>
  );
};

const DropZoneWrapper = styled.div`
  outline: none;
  overflow: hidden;
  position: relative;
  padding: 40px 8px;
  border-radius: 8px;
  transition: padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #f4f6f8;
  border: 1px dashed rgba(145, 158, 171, 0.32);
  &:hover {
    opacity: 0.72;
    cursor: pointer;
  }
  margin-bottom: 10px;
`;

export default ImageInput;
