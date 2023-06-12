import * as React from 'react';
import { render } from '@testing-library/react';
import { MockIntegrationTests } from '../__data__/mock-integration-tests';
import IntegrationTestListRow from '../IntegrationTestListRow';

jest.mock('react-router-dom', () => ({
  Link: (props) => <>{props.children}</>,
}));

jest.mock('../../../../utils/rbac', () => ({
  useAccessReviewForModel: jest.fn(() => [true, true]),
}));

describe('IntegrationTestListRow', () => {
  it('should render integration test info with https appended url', () => {
    const integrationTest = MockIntegrationTests[0];
    const wrapper = render(<IntegrationTestListRow obj={integrationTest} columns={[]} />, {
      container: document.createElement('tr'),
    });
    const cells = wrapper.container.getElementsByTagName('td');

    expect(cells[0].innerHTML).toBe(integrationTest.metadata.name);
    expect(cells[1].children[0].innerHTML).toBe(`https://${integrationTest.spec.bundle}`);
    expect(cells[3].innerHTML).toBe(integrationTest.spec.pipeline);
  });

  it('should read the optional field from label', () => {
    const optionalIntegrationTest = MockIntegrationTests[0];
    const wrapper = render(<IntegrationTestListRow obj={optionalIntegrationTest} columns={[]} />, {
      container: document.createElement('tr'),
    });
    const cells = wrapper.container.getElementsByTagName('td');
    expect(cells[2].innerHTML).toBe('Optional');
  });

  it('should show mandatory value if the optional labels are not set', () => {
    const mandatoryIntegrationTest = MockIntegrationTests[1];
    const wrapper = render(<IntegrationTestListRow obj={mandatoryIntegrationTest} columns={[]} />, {
      container: document.createElement('tr'),
    });
    const cells = wrapper.container.getElementsByTagName('td');
    expect(cells[2].innerHTML).toBe('Mandatory');
  });

  it('should append https to bundle url only where required', () => {
    const integrationTest = MockIntegrationTests[1];
    const wrapper = render(<IntegrationTestListRow obj={integrationTest} columns={[]} />, {
      container: document.createElement('tr'),
    });
    const cells = wrapper.container.getElementsByTagName('td');
    expect(cells[1].children[0].innerHTML).toBe(`${integrationTest.spec.bundle}`);
  });
});
