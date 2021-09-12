import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Button from "../button/button";

interface IProps {
  containerClassName?: string;
  label?: string;
  onSelectFile?: (file: File) => any;
}
const ImagePicker: React.FC<IProps> = ({
  containerClassName,
  label,
  onSelectFile,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    let current: any;
    if (containerRef.current) {
      current = containerRef.current;
      current.addEventListener("dragover", handleDragOver);
      current.addEventListener("drop", handleDrop);

      return () => {
        current.removeEventListener("dragover", handleDragOver);
        current.removeEventListener("drop", handleDrop);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      updateFile(files[0]);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      updateFile(e.target.files[0]);
    }
  };

  const onClickButton = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const updateFile = (file: File) => {
    if (file) {
      if (file.type.includes("image")) {
        setFile(file);
        if (onSelectFile) onSelectFile(file);
      }
    }
  };

  return (
    <div
      className={`flex flex-col items-center w-full justify-center py-6 px-3 border border-dashed border-gray-200 rounded-lg hover:border-primary ${containerClassName}`}
      ref={containerRef}
    >
      <p>{label ?? "Upload a File"}</p>
      <p className=" text-gray-400 text-sm">
        Click "Select File" or drag your image into this box.
      </p>
      <Button className=" mt-2" onClick={onClickButton}>
        Select File
      </Button>
      {Boolean(file) && (
        <img
          className=" mt-3 max-h-28 max-w-xs w-full h-full"
          src={URL.createObjectURL(file)}
          alt={file?.name}
        />
      )}
      <input
        className=" w-0 h-0 opacity-0"
        multiple={false}
        onChange={onChange}
        ref={inputRef}
        type="file"
      />
    </div>
  );
};

export default ImagePicker;
