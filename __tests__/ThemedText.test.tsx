import * as React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import { ThemedText } from '../components/ThemedText';

describe('ThemedText Component', () => {
  // Snapshot test
  it('renders correctly with snapshot', () => {
    const tree = renderer.create(<ThemedText>Snapshot test!</ThemedText>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Test default styling
  it('renders with default styling', () => {
    const { getByText } = render(<ThemedText>Test text</ThemedText>);
    const textElement = getByText('Test text');
    expect(textElement.props.style).toBeTruthy();
  });

  // Test with custom style prop
  it('applies custom styles correctly', () => {
    const customStyle = { fontSize: 20, color: 'red' };
    const { getByText } = render(
      <ThemedText style={customStyle}>Custom styled text</ThemedText>
    );
    const textElement = getByText('Custom styled text');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)])
    );
  });
});
