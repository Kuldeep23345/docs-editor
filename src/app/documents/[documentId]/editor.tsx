'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table';
import { Highlight } from '@tiptap/extension-highlight';
import { Color } from '@tiptap/extension-color';
import { Link } from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';

import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';

import { fontSizeExtension } from '@/extensions/font-size';

import useEditorStore from '@/store/use-editor-store';
import { LineHeightExtension } from '@/extensions/line-height';
import Ruler from './ruler';
import { useLiveblocksExtension, FloatingToolbar } from '@liveblocks/react-tiptap';
import { Threads } from './threads';
import { useStorage } from '@liveblocks/react/suspense';
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/constants/margins';

interface EditorProps {
  initialContent?: string | undefined;
}

const Editor = ({ initialContent }: EditorProps) => {
  const leftMargin = useStorage((storage) => storage.leftMargin);
  const rightMargin = useStorage((storage) => storage.rightMargin);

  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    autofocus: true,
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin ?? LEFT_MARGIN_DEFAULT}px; padding-right: ${rightMargin ?? RIGHT_MARGIN_DEFAULT}px;`,
        class:
          'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-204 pt-10 pr-14 pb-10 cursor-text',
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        undoRedo: false,
      }),
      fontSizeExtension,
      LineHeightExtension.configure({
        types: ['heading', 'paragraph'],
        defaultLineHeight: 'normal',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Color,
      TextStyle,
      FontFamily,
      Underline,
      Image,
      ImageResize,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
    ],
    immediatelyRender: false,
  });

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0  print:bg-white  print:overflow-visible">
      <Ruler />
      <div className="min-w-max flex justify-center w-204 py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
