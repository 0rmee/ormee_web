import { QuizFormValues } from '@/types/quiz.types';
import { useActiveProblemStore } from '@/stores/activeProblemStore';
import { FieldArrayWithId, UseFieldArrayRemove, useFormContext } from 'react-hook-form';
import ProblemTypeDropdown from './problem/ProblemTypeDropdown';
import ChoiceItemContainer from './problem/ChoiceItemContainer';
import Answer from './problem/Answer';
import RemoveProblemButton from './problem/RemoveProblemButton';
import TipTapField from '../ui/TipTapField';
import { Editor } from '@tiptap/react';

type ProblemInputProps = {
  /** useFieldArray의 fields에서 가져온 problem 데이터 */
  problem: FieldArrayWithId<QuizFormValues, 'problems', 'id'>;
  /** problem의 index */
  index: number;
  /** problem fields의 remove 함수 */
  remove: UseFieldArrayRemove;
  /** Toolbar에 에디터를 세팅할 함수 */
  setEditor: (editor: Editor | null) => void;
};

const ACTIVE_BORDER_STYLE = 'border-purple-50';
const INACTIVE_BORDER_STYLE = 'border-white';

export default function ProblemInput({ problem, index, remove, setEditor }: ProblemInputProps) {
  const { activeProblemId, setActiveProblemId } = useActiveProblemStore();
  const { control } = useFormContext<QuizFormValues>();
  const isActive = activeProblemId === problem.id;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isActive) return;
    setActiveProblemId(problem.id);
  };

  return (
    <div
      className={`flex flex-col justify-start items-start w-full px-[30px] py-[20px] gap-[24px] rounded-[10px] bg-white box-border border ${isActive ? ACTIVE_BORDER_STYLE : INACTIVE_BORDER_STYLE}`}
      onClick={handleClick}
    >
      <div className='w-full'>
        <div className='flex justify-between items-center self-stretch w-full mb-[10px]'>
          <span className='text-title3 font-normal text-center'>{index + 1}</span>
          <ProblemTypeDropdown index={index} />
        </div>
        <TipTapField
          control={control}
          name={`problems.${index}.context`}
          placeholder='질문을 입력하세요.'
          fieldStyle='p-[20px] rounded-[10px] border border-gray-20 focus:outline-none w-full min-h-[50px]'
          placeholderStyle='placeholder-pl-20'
          setEditor={setEditor}
        />
      </div>
      <ChoiceItemContainer
        problemIndex={index}
        setEditor={setEditor}
      />
      <div className='flex justify-between items-center w-full'>
        <Answer problemIndex={index} />
        <RemoveProblemButton
          problemIndex={index}
          remove={remove}
        />
      </div>
    </div>
  );
}
