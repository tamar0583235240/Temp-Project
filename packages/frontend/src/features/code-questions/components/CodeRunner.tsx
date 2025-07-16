// import React, { useRef, useState } from 'react';
// import Editor, { Monaco } from '@monaco-editor/react';
// import { Button } from '../../../shared/ui/button';

// type Language = 'java' | 'python' | 'sql' | 'html';

// const languageMap: Record<Language, string> = {
//   java: 'java',
//   python: 'python',
//   sql: 'sql',
//   html: 'html',
// };

// const initialCode: Record<Language, string> = {
//   java: `public class Main {
//   public static void main(String[] args) {
//     System.out.println("Hello, Java!");
//   }
// }`,
//   python: `print("Hello, Python!")`,
//   sql: `SELECT 'Hello, SQL!' AS message;`,
//   html: `<!DOCTYPE html>
// <html>
//   <head>
//     <title>Hello HTML</title>
//   </head>
//   <body>
//     <h1>Hello, HTML!</h1>
//   </body>
// </html>`,
// };

// const commentSymbols: Record<Language, string> = {
//   java: '//',
//   python: '#',
//   sql: '--',
//   html: '<!--',
// };

// const CodeRunner = () => {
//   const editorRef = useRef<any>(null);
//   const [language, setLanguage] = useState<Language>('java');
//   const [code, setCode] = useState(initialCode['java']);
//   const [output, setOutput] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleEditorDidMount = (editor: any, monaco: Monaco) => {
//     editorRef.current = editor;

//     editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash, () => {
//       const commentSymbol = commentSymbols[language];
//       const selection = editor.getSelection();
//       const model = editor.getModel();
//       if (!selection || !model) return;

//       const lineNumber = selection.startLineNumber;
//       const lineContent = model.getLineContent(lineNumber);

//       if (lineContent.trim().startsWith(commentSymbol)) {
//         const uncommented = lineContent.replace(commentSymbol, '').trimStart();
//         model.applyEdits([
//           {
//             range: new monaco.Range(lineNumber, 1, lineNumber, lineContent.length + 1),
//             text: uncommented,
//           },
//         ]);
//       } else {
//         const commented = `${commentSymbol} ${lineContent}`;
//         model.applyEdits([
//           {
//             range: new monaco.Range(lineNumber, 1, lineNumber, lineContent.length + 1),
//             text: commented,
//           },
//         ]);
//       }
//     });
//   };

//   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const lang = e.target.value as Language;
//     setLanguage(lang);
//     setCode(initialCode[lang]);
//     setOutput(null);
//   };

//   const runCode = async () => {
//     setLoading(true);
//     setOutput(null);

//     try {
//       const res = await fetch('http://localhost:5000/api/practice/runCode', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ language, code }),
//       });

//       const data = await res.json();

//       if (!res.ok || data.success === false) {
//         setOutput('שגיאה: ' + (data.error || 'אירעה שגיאה'));
//       } else {
//         setOutput(data.rows ? JSON.stringify(data.rows, null, 2) : data.output);
//       }
//     } catch (e: any) {
//       setOutput('שגיאה בתקשורת עם השרת: ' + e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         fontFamily: 'Arial, sans-serif',
//         direction: 'ltr',
//         height: '90vh',
//         maxWidth: 900,
//         margin: 'auto',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 12,
//         padding: 16,
//       }}
//     >
//       <h3 style={{ marginBottom: 0 }}>הרצת קוד - בחר שפה</h3>

//       <div
//         style={{
//           display: 'flex',
//           gap: 10,
//           alignItems: 'center',
//           marginBottom: 10,
//         }}
//       >
//         <select
//           value={language}
//           onChange={handleLanguageChange}
//           style={{
//             padding: '6px 10px',
//             borderRadius: 6,
//             border: '1.5px solid #ccc',
//             fontSize: 14,
//             minWidth: 130,
//             cursor: 'pointer',
//           }}
//           disabled={loading}
//         >
//           <option value="java">Java</option>
//           <option value="python">Python</option>
//           <option value="sql">SQL</option>
//           <option value="html">HTML</option>
//         </select>

//    <Button
//   onClick={runCode}
//   className="run-code-button"
//   disabled={loading}
//   style={{ minWidth: 100, padding: '4px 8px' }}
// >
//   {loading ? 'מריץ...' : 'הרצת קוד'}
// </Button>

//       </div>

//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
// <Editor
//   height="50vh" // גובה נמוך יותר
//   defaultLanguage={languageMap[language]}
//   value={code}
//   onChange={(value) => setCode(value || '')}
//   onMount={handleEditorDidMount}
//   options={{
//     fontSize: 14,
//     minimap: { enabled: false },
//     automaticLayout: true,
//     scrollBeyondLastLine: false,
//   }}
// />



//         {output && (
//           language === 'html' ? (
//             <div
//               style={{
//                 flex: 'none',
//                 background: '#fff',
//                 padding: 12,
//                 borderRadius: 6,
//                 border: '1px solid #ccc',
//                 minHeight: 100,
//                 overflowY: 'auto',
//               }}
//               dangerouslySetInnerHTML={{ __html: output }}
//             />
//           ) : (
//             <pre
//               style={{
//                 flex: 'none',
//                 background: '#f9f9f9',
//                 padding: 12,
//                 marginTop: 0,
//                 borderRadius: 6,
//                 border: '1px solid #ccc',
//                 whiteSpace: 'pre-wrap',
//                 minHeight: 100,
//                 maxHeight: 200,
//                 overflowY: 'auto',
//                 fontSize: 14,
//                 lineHeight: 1.4,
//               }}
//             >
//               {typeof output === 'object' ? JSON.stringify(output, null, 2) : output}
//             </pre>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default CodeRunner;




// import React, { useRef, useState } from 'react';
// import Editor, { Monaco } from '@monaco-editor/react';
// import { Button } from '../../../shared/ui/button';
// import { useRunCodeMutation } from '../../../shared/api/practiceApi'; // ייבוא מה-API שלך

// type Language = 'java' | 'python' | 'sql' | 'html';

// const languageMap: Record<Language, string> = {
//   java: 'java',
//   python: 'python',
//   sql: 'sql',
//   html: 'html',
// };

// const initialCode: Record<Language, string> = {
//   java: `public class Main {
//   public static void main(String[] args) {
//     System.out.println("Hello, Java!");
//   }
// }`,
//   python: `print("Hello, Python!")`,
//   sql: `SELECT 'Hello, SQL!' AS message;`,
//   html: `<!DOCTYPE html>
// <html>
//   <head>
//     <title>Hello HTML</title>
//   </head>
//   <body>
//     <h1>Hello, HTML!</h1>
//   </body>
// </html>`,
// };

// const commentSymbols: Record<Language, string> = {
//   java: '//',
//   python: '#',
//   sql: '--',
//   html: '<!--',
// };

// const CodeRunner = () => {
//   const editorRef = useRef<any>(null);
//   const [language, setLanguage] = useState<Language>('java');
//   const [code, setCode] = useState(initialCode['java']);
//   const [output, setOutput] = useState<string | null>(null);

//   const [runCode, { isLoading }] = useRunCodeMutation();

//   const handleEditorDidMount = (editor: any, monaco: Monaco) => {
//     editorRef.current = editor;

//     editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash, () => {
//       const commentSymbol = commentSymbols[language];
//       const selection = editor.getSelection();
//       const model = editor.getModel();
//       if (!selection || !model) return;

//       const lineNumber = selection.startLineNumber;
//       const lineContent = model.getLineContent(lineNumber);

//       if (lineContent.trim().startsWith(commentSymbol)) {
//         const uncommented = lineContent.replace(commentSymbol, '').trimStart();
//         model.applyEdits([
//           {
//             range: new monaco.Range(lineNumber, 1, lineNumber, lineContent.length + 1),
//             text: uncommented,
//           },
//         ]);
//       } else {
//         const commented = `${commentSymbol} ${lineContent}`;
//         model.applyEdits([
//           {
//             range: new monaco.Range(lineNumber, 1, lineNumber, lineContent.length + 1),
//             text: commented,
//           },
//         ]);
//       }
//     });
//   };

//   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const lang = e.target.value as Language;
//     setLanguage(lang);
//     setCode(initialCode[lang]);
//     setOutput(null);
//   };

//   const handleRunCode = async () => {
//     setOutput(null);
//     try {
//       const data = await runCode({ language, code }).unwrap();
//       setOutput(data.rows ? JSON.stringify(data.rows, null, 2) : data.output);
//     } catch (error: any) {
//       setOutput('שגיאה: ' + (error?.data?.error || error.message || 'אירעה שגיאה'));
//     }
//   };

//   return (
//     <div
//       style={{
//         fontFamily: 'Arial, sans-serif',
//         direction: 'ltr',
//         height: '90vh',
//         maxWidth: 900,
//         margin: 'auto',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 12,
//         padding: 16,
//       }}
//     >
//       <h3 style={{ marginBottom: 0 }}>הרצת קוד - בחר שפה</h3>

//       <div
//         style={{
//           display: 'flex',
//           gap: 10,
//           alignItems: 'center',
//           marginBottom: 10,
//         }}
//       >
//         <select
//           value={language}
//           onChange={handleLanguageChange}
//           style={{
//             padding: '6px 10px',
//             borderRadius: 6,
//             border: '1.5px solid #ccc',
//             fontSize: 14,
//             minWidth: 130,
//             cursor: 'pointer',
//           }}
//           disabled={isLoading}
//         >
//           <option value="java">Java</option>
//           <option value="python">Python</option>
//           <option value="sql">SQL</option>
//           <option value="html">HTML</option>
//         </select>

//         <Button
//           onClick={handleRunCode}
//           className="run-code-button"
//           disabled={isLoading}
//           style={{ minWidth: 100, padding: '4px 8px' }}
//         >
//           {isLoading ? 'מריץ...' : 'הרצת קוד'}
//         </Button>
//       </div>

//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
//         <Editor
//           height="50vh"
//           defaultLanguage={languageMap[language]}
//           value={code}
//           onChange={(value) => setCode(value || '')}
//           onMount={handleEditorDidMount}
//           options={{
//             fontSize: 14,
//             minimap: { enabled: false },
//             automaticLayout: true,
//             scrollBeyondLastLine: false,
//           }}
//         />

//         {output && (
//           language === 'html' ? (
//             <div
//               style={{
//                 flex: 'none',
//                 background: '#fff',
//                 padding: 12,
//                 borderRadius: 6,
//                 border: '1px solid #ccc',
//                 minHeight: 100,
//                 overflowY: 'auto',
//               }}
//               dangerouslySetInnerHTML={{ __html: output }}
//             />
//           ) : (
//             <pre
//               style={{
//                 flex: 'none',
//                 background: '#f9f9f9',
//                 padding: 12,
//                 marginTop: 0,
//                 borderRadius: 6,
//                 border: '1px solid #ccc',
//                 whiteSpace: 'pre-wrap',
//                 minHeight: 100,
//                 maxHeight: 200,
//                 overflowY: 'auto',
//                 fontSize: 14,
//                 lineHeight: 1.4,
//               }}
//             >
//                {typeof output === 'object' ? JSON.stringify(output, null, 2) : output}
//             </pre>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default CodeRunner;


import React, { useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { Button } from '../../../shared/ui/button';
import { useRunCodeMutation } from '../../../shared/api/practiceApi'; // ייבוא מה-API שלך

type Language = 'java' | 'python' | 'sql' | 'html';

const languageMap: Record<Language, string> = {
  java: 'java',
  python: 'python',
  sql: 'sql',
  html: 'html',
};

const initialCode: Record<Language, string> = {
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Java!");
  }
}`,
  python: `print("Hello, Python!")`,
  sql: `SELECT 'Hello, SQL!' AS message;`,
  html: `<!DOCTYPE html>
<html>
  <head>
    <title>Hello HTML</title>
  </head>
  <body>
    <h1>Hello, HTML!</h1>
  </body>
</html>`,
};

const commentSymbols: Record<Language, string> = {
  java: '//',
  python: '#',
  sql: '--',
  html: '<!--',
};

const CodeRunner = () => {
  const editorRef = useRef<any>(null);
  const [language, setLanguage] = useState<Language>('java');
  const [code, setCode] = useState(initialCode['java']);
  const [output, setOutput] = useState<string | null>(null);

  const [runCode, { isLoading }] = useRunCodeMutation();

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash, () => {
      const commentSymbol = commentSymbols[language];
      const selection = editor.getSelection();
      const model = editor.getModel();
      if (!selection || !model) return;

      const lineNumber = selection.startLineNumber;
      const lineContent = model.getLineContent(lineNumber);

      if (lineContent.trim().startsWith(commentSymbol)) {
        const uncommented = lineContent.replace(commentSymbol, '').trimStart();
        model.applyEdits([
          {
            range: new monaco.Range(lineNumber, 1, lineNumber, lineContent.length + 1),
            text: uncommented,
          },
        ]);
      } else {
        const commented = `${commentSymbol} ${lineContent}`;
        model.applyEdits([
          {
            range: new monaco.Range(lineNumber, 1, lineNumber, lineContent.length + 1),
            text: commented,
          },
        ]);
      }
    });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as Language;
    setLanguage(lang);
    setCode(initialCode[lang]);
    setOutput(null);
  };

  const handleRunCode = async () => {
    setOutput(null);
    try {
      const data = await runCode({ language, code }).unwrap();
      setOutput(data.rows ? JSON.stringify(data.rows, null, 2) : data.output);
    } catch (error: any) {
      setOutput('שגיאה: ' + (error?.data?.error || error.message || 'אירעה שגיאה'));
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        direction: 'ltr',
        height: '90vh',
        maxWidth: 900,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 16,
      }}
    >
      <h3 style={{ marginBottom: 0 }}>הרצת קוד - בחר שפה</h3>

      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <select
          value={language}
          onChange={handleLanguageChange}
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1.5px solid #ccc',
            fontSize: 14,
            minWidth: 130,
            cursor: 'pointer',
          }}
          disabled={isLoading}
        >
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="sql">SQL</option>
          <option value="html">HTML</option>
        </select>

        <Button
          onClick={handleRunCode}
          className="run-code-button"
          disabled={isLoading}
          style={{ minWidth: 100, padding: '4px 8px' }}
        >
          {isLoading ? 'מריץ...' : 'הרצת קוד'}
        </Button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Editor
          height="50vh"
          defaultLanguage={languageMap[language]}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
        />

        {output && (
          language === 'html' ? (
            <iframe
              title="HTML Preview"
              srcDoc={output}
              style={{
                flex: 'none',
                background: '#fff',
                padding: 12,
                borderRadius: 6,
                border: '1px solid #ccc',
                minHeight: 300,
                width: '100%',
              }}
            />
          ) : (
            <pre
              style={{
                flex: 'none',
                background: '#f9f9f9',
                padding: 12,
                marginTop: 0,
                borderRadius: 6,
                border: '1px solid #ccc',
                whiteSpace: 'pre-wrap',
                minHeight: 100,
                maxHeight: 200,
                overflowY: 'auto',
                fontSize: 14,
                lineHeight: 1.4,
              }}
            >
              {typeof output === 'object' ? JSON.stringify(output, null, 2) : output}
            </pre>
          )
        )}
      </div>
    </div>
  );
};

export default CodeRunner;
