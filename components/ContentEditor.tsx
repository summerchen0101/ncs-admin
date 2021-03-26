import useHelper from '@/utils/useHelper'
import useTransfer from '@/utils/useTransfer'
import { ContentState, convertToRaw, EditorProps, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

type ContentEditorProps = {
  value?: string
  onChange?: (s: string) => void
}

const ContentEditor = function (
  { value, onChange, ...props }: ContentEditorProps,
  ref,
) {
  const { getBase64 } = useHelper()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  useEffect(() => {
    if (!value) return
    const contentBlock = htmlToDraft(value)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      )
      setEditorState(EditorState.createWithContent(contentState))
    }
  }, [])
  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state)
    onChange(draftToHtml(convertToRaw(state.getCurrentContent())))
  }

  const uploadCallback = async function (file) {
    const imgUrl = await getBase64(file)
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          link: imgUrl,
        },
      })
    })
  }

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      editorStyle={{ minHeight: '400px', margin: '0 15px' }}
      wrapperStyle={{ border: '1px solid #eee' }}
      toolbar={{
        image: {
          uploadCallback: uploadCallback,
          previewImage: true,
        },
      }}
      {...props}
      ref={ref}
    />
  )
}

export default React.forwardRef(ContentEditor)
