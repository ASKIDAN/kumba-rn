import React from 'react';
import {Image, Pressable, View} from 'react-native';
import styles from './styles';

interface CheckBoxProps {
  active: boolean;
  onChange: () => void;
}
const Checkbox: React.FC<CheckBoxProps> = ({active, onChange}) => (
  <Pressable onPress={onChange}>
    <View style={[styles.checkbox, active && styles.active]}>
      {active ? (
        <Image
          style={styles.image}
          source={require('../../assets/check.png')}
        />
      ) : null}
    </View>
  </Pressable>
);

export default Checkbox;
