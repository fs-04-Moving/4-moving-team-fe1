interface Props {
  id?: string;
  text: string;
}

/**
 * input 태그에 사용되는 label 컴포넌트입니다.
 * @param param0
 * - id: input의 id값(문자열)
 *   - 포커싱하지 않을 경우 전달되지 않을 수도 있음
 * - text: label 텍스트(문자열)
 * @returns
 */
function LabelInput({ id, text }: Props) {
  return (
    <div className="mb-2 lg:mb-4">
      <label htmlFor={id} className="lg:text-xl text-Black-400">
        {text}
      </label>
    </div>
  );
}

export default LabelInput;
