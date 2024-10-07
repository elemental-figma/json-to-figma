// @ts-nocheck
import React from 'react';
const { widget } = figma;
const { AutoLayout, SVG } = widget as any;

import { renderJSON } from '@elemental-figma/object-bridge';
import { render, View, Text } from '@react-platform/figma';

// import { renderJSONRootToFigma } from './render';

figma.showUI(__html__, { themeColors: true, height: 400, width: 400 });

// renderJSONRootToFigma(data);


const Button = ({ svg }: { svg?: any }) => (
  <View style={{ borderColor: '#E6E6E6', background: '#fff', borderRadius: 8, padding: 16 }}>
    <Text style={{ fontSize: 24, textAlign: 'center', color: '#006F26' }}>
      Button Test
    </Text>
    {svg && <SVG src={svg} />}
  {/* </AutoLayout> */}
  </View>
)

figma.ui.onmessage = async (msg) => {
  const { type, data } = msg;
  if (type === 'create-components') {

    const loadFonts = async () => {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" })
      await figma.loadFontAsync({ family: "Inter", style: "Medium" })
      await figma.loadFontAsync({ family: "Inter", style: "Bold" })
      await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" })
    
      console.log("Awaiting the fonts.")
    }
    await loadFonts();
    try {
      await renderJSON(data || testData);
    } catch(err) {
      console.log(err)
    }

    figma.ui.postMessage({
      type: 'created-components',
      message: `Created components`,
    });
  }
}
