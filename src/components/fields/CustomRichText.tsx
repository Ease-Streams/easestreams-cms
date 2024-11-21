'use client'
import React, { useEffect, useState } from 'react'
import { useField } from '@payloadcms/ui'
import FroalaEditor from 'react-froala-wysiwyg'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/css/froala_editor.pkgd.min.css'

const CustomTextField = ({ path, label }) => {
  const { value, setValue } = useField<string>({ path })
  const [editorContent, setEditorContent] = useState('')

  const handleEditorChange = (content) => {
    setEditorContent(content)
    setValue(content) // Update Payload CMS with HTML content
  }

  useEffect(() => {
    setEditorContent(value || '') // Initialize content
  }, [value])

  return (
    <div className="field-type text-field">
      <label className="field-label">{path}</label>
      <FroalaEditor
        model={editorContent}
        onModelChange={handleEditorChange}
        config={{
          pluginsEnabled: [
            'align',
            'charCounter',
            'codeBeautifier',
            'codeView',
            'colors',
            'draggable',
            'embedly',
            'emoticons',
            'entities',
            'file',
            'fontFamily',
            'fontSize',
            'fullscreen',
            'image',
            'imageManager',
            'inlineStyle',
            'lineHeight',
            'link',
            'lists',
            'paragraphFormat',
            'paragraphStyle',
            'print',
            'quote',
            'save',
            'specialCharacters',
            'table',
            'url',
            'video',
            'wordPaste',
          ], // Enable all plugins
        }}
      />
    </div>
  )
}

export default CustomTextField
