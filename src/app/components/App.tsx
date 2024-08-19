import React, { useState } from 'react';
// import logo from '../assets/logo.svg';
import '../styles/ui.css';

function renderToString(element) {
  return stringifyElement(element);
}

function stringifyElement(element) {
  if (typeof element === 'string' || typeof element === 'number') {
      return escapeHTML(element.toString());
  }

  if (React.isValidElement(element)) {
      const type = element.type;
      const props = element.props;
      let children = (props as any).children || [];

      if (!Array.isArray(children)) {
          children = [children];
      }

      const childrenString = children.map(child => stringifyElement(child)).join('');

      return `<${type}${stringifyProps(props)}>${childrenString}</${type}>`;
  }

  return '';
}

function stringifyProps(props) {
  return Object.keys(props).map(key => {
      if (key === 'children') {
          return '';
      }
      return ` ${key}="${escapeHTML(props[key].toString())}"`;
  }).join('');
}

function escapeHTML(html) {
  return html.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;')
             .replace(/"/g, '&quot;')
             .replace(/'/g, '&#39;');
}


const svg = renderToString(
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15.5" stroke="black" stroke-opacity="0.1"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 8H15V15H8V17H15V24H17V17H24V15H17V8Z" fill="black" fill-opacity="0.8"/>
  </svg>
)

function MainWindow() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onCreate = () => {
    try {
      parent.postMessage({
        pluginMessage: {
          type: 'create-components',
          data: JSON.parse(inputValue),
          svg
        },
      }, '*');
    } catch(err) {
      console.log('Failed JSON.parse')
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        <label htmlFor="textInput" style={{ color: 'var(--figma-color-text)', textAlign: 'start', fontSize: 16 }}>Enter JSON:</label>
        <textarea
          id="textInput"
          value={inputValue}
          placeholder={`{
  "id": "0:0",
  "type": "DOCUMENT",
  "name": "Component Library",
  "isAsset": false,
  "detachedInfo": null,
  "documentColorProfile": "LEGACY",
  "children": [
    {
      "id": "0:1",
      "type": "PAGE",
      "name": "Page 1",
      "isAsset": false,
      "detachedInfo": null,
      "guides": [],
      "selectedTextRange": null
    }
  ]
}`}
          onChange={handleInputChange}
          style={{ width: '100%', minHeight: '50vh', padding: 8 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button id="create" onClick={onCreate}>
          Render JSON
        </button>
      </div>
    </>
  )
}

function App() {
  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type } = event.data.pluginMessage;
      if (type === 'create-components') {
        // Success
        // figma.notify
        // console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <MainWindow />
    </div>
  );
}

export default App;
