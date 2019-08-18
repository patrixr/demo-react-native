import React              from 'react';
import { Text, View }     from 'react-native';
import { PRIMARY_COLOR }  from '../constants/Colors';

export function BaseText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'roboto' }]} />
  );
}

export function BoldText(props) {
  return (
    <BaseText {...props} style={{ ...props.style, fontWeight: 'bold' }} />
  );
}

export function InfoText(props) {
  return (
    <BaseText {...props} style={{
      ...props.style,
      fontSize: 12,
      marginBottom: 10,
      color: PRIMARY_COLOR
    }} />
  );
}

export function Paragraph({ text, style = {} }) {
  const lines = text.split('\n').map(line => {
    return line.charAt(0).toUpperCase() + line.slice(1);
  });

  return (
    <View>
      {
        lines.map((line, idx) => (
          <BaseText key={idx} style={{
            fontSize: 16,
            marginBottom: 10,
            ...style
          }}>{line}</BaseText>
        ))
      }
    </View>
  );
}