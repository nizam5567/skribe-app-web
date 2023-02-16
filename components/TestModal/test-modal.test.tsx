import 'jsdom-global/register';
import { expect } from '@jest/globals';
import { mount } from 'enzyme';
import React from 'react';
import TestModal from '../Modal';
import TestModalChild from './modal-child';

interface TestModalPropsType {
  openModal: any
  modalTitle: any
  modalSubTitle?: string
  modalDescription?: any
  handleModalOpen: () => void
  handleModalClose: () => void
  children?: React.ReactNode
}
const openModal = true;
const handleModalOpen = jest.fn();
const handleModalClose = jest.fn();
const handleRemove = jest.fn();
const TestModalProps = {
  openModal,
  'modalTitle': 'Title',
  'modalSubTitle': 'Subtitle',
  'modalDescription': 'Description',
  handleModalOpen,
  handleModalClose,
  'children': <TestModalChild />
};

const getWrapper = async (props: TestModalPropsType) => mount(<TestModal {...props} />);

describe('Testing modal component ', () => {
  test('Show modal', async () => {
    const wp = await getWrapper(TestModalProps);
    const modalContent = wp
      .find('.modal-container')
      .at(0)
      .getElement();
    expect(modalContent.props.open).toBe(true);
    wp.unmount();
  });

  test('Cancel modal', async () => {
    const wp = await getWrapper(TestModalProps);
    const modalCloseButton = wp.find('.cancel-btn').at(4);
    modalCloseButton.simulate('click');
    expect(handleModalClose).toHaveBeenCalled();
    expect(handleRemove).not.toHaveBeenCalled();
    wp.unmount();
  });

  test('Modal Title', async () => {
    const wp = await getWrapper(TestModalProps);
    const modalContent = wp
      .find('.modal-header')
      .at(0)
      .getElements();
    expect(modalContent[0].props.children).toMatch(TestModalProps.modalTitle);
    expect(modalContent[0].props.children).not.toBe(undefined);
    expect(modalContent[0].props.children).not.toMatch('nottitle');
    wp.unmount();
  });

  test('Modal Subtitle', async () => {
    const wp = await getWrapper(TestModalProps);
    const modalContent = wp
      .find('.modal-sub-header')
      .at(0)
      .getElements();
    expect(modalContent[0].props.children).not.toBe(undefined);
    expect(modalContent[0].props.children).toMatch(
      TestModalProps.modalSubTitle
    );
    expect(modalContent[0].props.children).not.toMatch('notSubtitle'); // modal subtitle negative test case
    wp.unmount();
  });

  test('Modal Description', async () => {
    const wp = await getWrapper(TestModalProps);
    const modalContent = wp
      .find('.modal-body')
      .at(0)
      .getElements();
    expect(modalContent[0].props.children[0]).not.toBe(undefined);
    expect(modalContent[0].props.children[0]).toMatch(
      TestModalProps.modalDescription
    );
    expect(modalContent[0].props.children[0]).not.toMatch('notDescription');
    wp.unmount();
  });

  test('Test modal child component', async () => {
    const wp = await getWrapper(TestModalProps);
    const childWrapper = await mount(wp.prop('children'));
    const modalContent = childWrapper
      .find('h1')
      .at(0)
      .getElements();
    expect(wp.containsMatchingElement(TestModalProps.children)).toEqual(true); // rendering child component
    expect(modalContent[0].props.children).toMatch('Test Modal Child');
    expect(modalContent[0].props.children).not.toMatch('NoText');
    wp.unmount();
  });
});
