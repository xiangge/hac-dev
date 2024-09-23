
// import * as React from 'react';
// import {
//   EmptyState,
//   EmptyStateHeader,
//   EmptyStateFooter,
//   EmptyStateBody,
//   EmptyStateIcon,
//   EmptyStateActions,
//   Button,
//   Spinner,
// } from '@patternfly/react-core';

// import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
// import { 
//     loading,
//     setSearchValue,
//     setApplicationSelections,
//     setTenantSelections,
//     setPvSelections,
//     setStatusSelections,
//     setProductSelections,
// } from './ReleaseMonitoringToobar';



// const rMEmptyState = (
//     <div>
//       {loading ? (
//         <div><Spinner size="lg" />Loading, please wait...</div>
//       ) : (
//         <EmptyState>
//           <EmptyStateHeader headingLevel="h4" titleText="No results found" icon={<EmptyStateIcon icon={SearchIcon} />} />
//           <EmptyStateBody>No results match the filter criteria. Clear all filters and try again.</EmptyStateBody>
//           <EmptyStateFooter>
//             <EmptyStateActions>
//               <Button
//                 variant="link"
//                 onClick={() => {
//                   setSearchValue('');
//                   setApplicationSelections([]);
//                   setTenantSelections([]);
//                   setPvSelections([]);
//                   setStatusSelections('');
//                   setProductSelections([]);
//                 }}
//               >
//                 Clear all filters
//               </Button>
//             </EmptyStateActions>
//           </EmptyStateFooter>
//         </EmptyState>
//       )}
//     </div>
//   );

// export default rMEmptyState;