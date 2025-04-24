import icGallery from '@/assets/images/ic-gallery.svg';
import { ALLOWED_TYPES, MAX_FILE_SIZE, MAX_FILE_SIZE_MB } from '@/constants';
import Image from 'next/image';
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import Input from '../atoms/Input';

interface Props extends React.ComponentProps<'input'> {
  label?: string;
  bgColor?: boolean;
  defaultImageUrl?: string; // 기존 이미지 URL을 위한 prop
}

/**
 * 참고 사항
 * - name과 control은 필수 항목
 * - id는 label 포커싱을 위해 필요 (불필요 시 생략 가능)
 */
function InputFile<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  defaultImageUrl,
  ...props
}: Props & UseControllerProps<TFieldValues, TName>) {
  const {
    field: { onChange, onBlur },
    fieldState: { error },
  } = useController(props);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pickedFileUrl, setPickedFileUrl] = useState<string>('');

  // 초기 URL 설정
  useEffect(() => {
    if (defaultImageUrl) {
      setPickedFileUrl(defaultImageUrl);
    }
  }, [defaultImageUrl]);

  const handleClickAddImageButton = () => {
    fileInputRef.current?.click();
  };

  const handleChangeFile: ChangeEventHandler = (e) => {
    const { files } = e.target as HTMLInputElement;
    if (!files || files.length === 0) return;
    const file = files[0];

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('JPG 또는 PNG, GIF 형식만 업로드 가능합니다.');
      fileInputRef.current!.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert(`파일 용량은 ${MAX_FILE_SIZE_MB}MB 이하만 가능합니다.`);
      // input 값 리셋 (같은 파일 다시 선택 가능하도록)
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    onChange(file);
    const fileUrl = URL.createObjectURL(file);
    setPickedFileUrl(fileUrl);
  };

  const handleClickDelete = () => {
    setPickedFileUrl('');
    onChange(null);
  };

  return (
    <div>
      <Input
        type="file"
        errorMessage={error?.message}
        onChange={handleChangeFile}
        onBlur={onBlur}
        className="hidden"
        ref={fileInputRef}
        {...props}
      />
      <div className="flex items-end">
        <div
          onClick={handleClickAddImageButton}
          className="flex relative justify-center items-center rounded-lg bg-BackGround-200 w-25 h-25 lg:w-40 lg:h-40 cursor-pointer hover:bg-BackGround-300 overflow-hidden"
        >
          {pickedFileUrl ? (
            <Image
              src={pickedFileUrl}
              alt="첨부이미지"
              fill
              className="rounded-xl aspect-square object-cover"
            />
          ) : (
            <Image
              src={icGallery}
              alt="갤러리 아이콘"
              className="w-8 lg:w-10"
            />
          )}
        </div>
        {pickedFileUrl && (
          <p
            onClick={handleClickDelete}
            className="ml-3 mb-2 text-xs lg:text-base text-GrayScale-400 underline cursor-pointer"
          >
            삭제
          </p>
        )}
      </div>
    </div>
  );
}

export default InputFile;
