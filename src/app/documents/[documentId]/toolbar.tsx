'use client';
import { cn } from '@/lib/utils';
import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquareCheckIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2,
} from 'lucide-react';
import useEditorStore from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';

interface ToolBarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Palatino', value: 'Palatino, serif' },
    { label: 'Impact', value: 'Impact, sans-serif' },
    { label: 'Verdana', value: 'Verdana, sans-serif' },
    { label: 'Helvetica', value: 'Helvetica, sans-serif' },
    { label: 'Garamond', value: 'Garamond, serif' },
    { label: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
    { label: 'Courier New', value: 'Courier New, monospace' },
    { label: 'Comic Sans MS', value: 'Comic Sans MS, cursive, sans-serif' },
    { label: 'TimesNewRoman', value: 'Times New Roman, serif' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="h-7 w-30 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm',
              editor?.getAttributes('textStyle')?.fontFamily === value && 'bg-enutral-200/80'
            )}
            style={{ fontFamily: value }}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ToolBarButton = ({ onClick, isActive, icon: Icon }: ToolBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export default function Toolbar() {
  const { editor } = useEditorStore();
  console.log('Toolbar editor', { editor });
  const sections: { icon: LucideIcon; label: string; isActive?: boolean; onClick: () => void }[][] =
    [
      [
        {
          label: 'Undo',
          icon: Undo2,
          isActive: false,
          onClick: () => editor?.chain().focus().undo().run(),
        },
        {
          label: 'Redo',
          icon: Redo2Icon,
          isActive: false,
          onClick: () => editor?.chain().focus().redo().run(),
        },
        {
          label: 'Print',
          icon: PrinterIcon,
          isActive: false,
          onClick: () => window.print(),
        },
        {
          label: 'Spell Check',
          icon: SpellCheckIcon,
          isActive: false,
          onClick: () => {
            const current = editor?.view.dom.getAttribute('spellcheck');
            editor?.view.dom.setAttribute('spellcheck', current === 'false' ? 'true' : 'false');
          },
        },
      ],
      [
        {
          label: 'Bold',
          icon: BoldIcon,
          isActive: editor?.isActive('bold'),
          onClick: () => editor?.chain().focus().toggleBold().run(),
        },
        {
          label: 'Italic',
          icon: ItalicIcon,
          isActive: editor?.isActive('italic'),
          onClick: () => editor?.chain().focus().toggleItalic().run(),
        },
        {
          label: 'Underline',
          icon: UnderlineIcon,
          isActive: editor?.isActive('underline'),
          onClick: () => editor?.chain().focus().toggleUnderline().run(),
        },
      ],
      [
        {
          label: 'Comment',
          icon: MessageSquarePlusIcon,
          onClick: () => console.log('TODO - implement comment functionality'),
          isActive: false,
        },
        {
          label: 'List Todo',
          icon: ListTodoIcon,
          onClick: () => editor?.chain().focus().toggleTaskList().run(),
          isActive: editor?.isActive('taskList'),
        },
        {
          label: 'Remove Formatting',
          icon: RemoveFormattingIcon,
          onClick: () => editor?.chain().focus().unsetAllMarks().run(),
          isActive: false,
        },
      ],
    ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-10 flex items-center gap-x-0.5 overflow-x-auto ">
      {sections[0].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}

      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[2].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
    </div>
  );
}
