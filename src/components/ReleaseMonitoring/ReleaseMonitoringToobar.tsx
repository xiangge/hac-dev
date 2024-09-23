// import * as React from 'react';
// import {
//   Toolbar,
//   ToolbarContent,
//   ToolbarItem,
//   Menu,
//   MenuContent,
//   MenuList,
//   MenuItem,
//   MenuToggle,
//   Popper,
//   Pagination,
//   Badge,
//   ToolbarGroup,
//   ToolbarFilter,
//   ToolbarToggleGroup,
//   SearchInput,
//   Switch
// } from '@patternfly/react-core';
// import axios from 'axios';
// import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';

// interface Release {
//     release_plan: string;
//     application: string;
//     rpa: string;
//     tenant: string;
//     name: string;
//     pv: string;
//     start_time: string;
//     end_time: string;
//     product: string;
//     status: string;
//     component: any[];
//   }

// export const useSearch = () => {
//     const [searchValue, setSearchValue] = React.useState('');
//     return [ searchValue, setSearchValue ];
// };
// export const applicationSelection = () => {
//     const [applicationSelections, setApplicationSelections] = React.useState<string[]>([]);
//     return [ applicationSelections, setApplicationSelections ];
// };
// export const tenantSelection = () => {
//     const [tenantSelections, setTenantSelections] = React.useState<string[]>([]);
//     return [ tenantSelections, setTenantSelections];
// };
// export const pvSelection = () => {
//     const [pvSelections, setPvSelections] = React.useState<string[]>([]);
//     return [ pvSelections, setPvSelections ];
// };
// export const statusSelection = () => {
//     const [statusSelections, setStatusSelections] = React.useState('');
//     return [ statusSelections, setStatusSelections ];
// };
// export const productSelection = () => {
//     const [productSelections, setProductSelections] = React.useState<string[]>([]);
//     return [ productSelections, setProductSelections ];
// };

// export const componentSelection = () => {
//     const [componentSelections, setComponentSelections] = React.useState<string[]>([]);
//     return [ componentSelections, setComponentSelections ];
// };

// export const loadSetting = () => {
//     const [loading, setLoading] = React.useState(true);
//     return [ loading, setLoading ];
// };

// export const releaseSelection = () => {
//     const [releases, setData] = React.useState<any[]>([]);
//     return [ releases, setData ];
// };


// const [searchValue, setSearchValue] = useSearch();
// const [applicationSelections, setApplicationSelections] = applicationSelection();
// const [tenantSelections, setTenantSelections] = tenantSelection();
// const [pvSelections, setPvSelections] = pvSelection();
// // const [statusSelections, setStatusSelections] = React.useState('');
// const [statusSelections, setStatusSelections] = statusSelection();
// const [productSelections, setProductSelections] = productSelection();
// const [releases, setData] = releaseSelection();
// const {loading, setLoading} = loadSetting();
// const [_, setError] = React.useState<string | null>(null);

// React.useEffect(() => {
//     const getData = async () => {
//         try {
//         console.log('API Response: Fetching results');
//         setLoading(true);
//         const result = await axios.get<any[]>('http://127.0.0.1:8080/api/v1/releases');
//         // console.log('API Response:', result);
//         // console.log('Response Data:', result.data);
//         setData(result.data);
//         } catch (err) {
//         setError('Failed to fetch data');
//         } finally {
//         setLoading(false);
//         }
//     };

//     getData();
//     }, 
//     []);

// const applications = Array.from(new Set(releases.map(release => release.application)));
// const tenants = Array.from(new Set(releases.map(release => release.tenant)));
// const pvs = Array.from(new Set(releases.map(release => release.pv)));
// const products = Array.from(new Set(releases.map(release => release.product)));

// const onSearchChange = (value: string) => {
//     setSearchValue(value);
//     };

// const onFilter = (release: Release) => {
//     // Search with search value
//     let searchValueInput: RegExp;
//     try {
//         searchValueInput = new RegExp(searchValue, 'i');
//     } catch (err) {
//         searchValueInput = new RegExp(searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
//     }

//     // Search with selections
//     const matchesSearchValue = release.release_plan.search(searchValueInput) >= 0;
//     const matchesTenantValue = tenantSelections.includes(release.tenant);
//     const matchesPvValue = pvSelections.includes(release.pv);
//     const matchesApplicationValue = applicationSelections.includes(release.application);
//     const matchesStatusValue = release.status.toLowerCase() === statusSelections.toLowerCase();
//     const matchesProductValue = productSelections.includes(release.product);

//     return (
//         (searchValue === '' || matchesSearchValue) &&
//         (tenantSelections.length === 0 || matchesTenantValue) &&
//         (pvSelections.length === 0 || matchesPvValue) &&
//         (applicationSelections.length === 0 || matchesApplicationValue) &&
//         (statusSelections === '' || matchesStatusValue) &&
//         (productSelections.length === 0 || matchesProductValue)
//     );
// };

// const filteredReleases = releases.filter(onFilter);

// // TODO: The pagnition doesn't work well, need to fix
// const [page, setPage] = React.useState(1);
// const [perPage, setPerPage] = React.useState(10);

// const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
// setPage(newPage);
// };

// const onPerPageSelect = (
// _event: React.MouseEvent | React.KeyboardEvent | MouseEvent,
// newPerPage: number,
// newPage: number
// ) => {
// setPerPage(newPerPage);
// setPage(newPage);
// };

// const toolbarPagination = (
// <Pagination
//     titles={{ paginationAriaLabel: 'Search pagination' }}
//     itemCount={releases.length}
//     perPage={perPage}
//     page={page}
//     onSetPage={onSetPage}
//     widgetId="attribute-search-mock-pagination"
//     isCompact
//     onPerPageSelect={onPerPageSelect}
//     ouiaId="PaginationTop"
// />
// );

// // const startIndex = (page - 1) * perPage;
// // const endIndex = startIndex + perPage;
// // const pagedReleases = filteredReleases.slice(startIndex, endIndex);


// // Set up name search input
// const searchInput = (
// <SearchInput
//     placeholder="Filter by product name"
//     value={searchValue}
//     onChange={(_event, value) => onSearchChange(value)}
//     onClear={() => onSearchChange('')}
// />
// );

// // Set up PV checkbox select
// const [isPvMenuOpen, setIsPvMenuOpen] = React.useState<boolean>(false);
// const pvToggleRef = React.useRef<HTMLButtonElement>(null);
// const pvMenuRef = React.useRef<HTMLDivElement>(null);
// const pvContainerRef = React.useRef<HTMLDivElement>(null);

// const handPvMenuKeys = (event: KeyboardEvent) => {
//     if (isPvMenuOpen && pvMenuRef.current?.contains(event.target as Node)) {
//         if (event.key === 'Escape' || event.key === 'Tab') {
//         setIsPvMenuOpen(!isPvMenuOpen);
//         pvToggleRef.current?.focus();
//         }
//     }
// };

// const handlePvClickOutside = (event: MouseEvent) => {
//     if (isPvMenuOpen && !pvMenuRef.current?.contains(event.target as Node)) {
//         setIsPvMenuOpen(false);
//     }
// };

// React.useEffect(() => {
//     window.addEventListener('keydown', handPvMenuKeys);
//     window.addEventListener('click', handlePvClickOutside);
//     return () => {
//         window.removeEventListener('keydown', handPvMenuKeys);
//         window.removeEventListener('click', handlePvClickOutside);
//     };
//     }, [isPvMenuOpen, pvMenuRef]);

//     const onPvMenuToggleClick = (ev: React.MouseEvent) => {
//     ev.stopPropagation(); // Stop handleClickOutside from handling
//     setTimeout(() => {
//         if (pvMenuRef.current) {
//         const firstElement = pvMenuRef.current.querySelector('li > button:not(:disabled)');
//         firstElement && (firstElement as HTMLElement).focus();
//         }
//     }, 0);
//     setIsPvMenuOpen(!isPvMenuOpen);
// };

// function onPvMenuSelect(event: React.MouseEvent | undefined, itemId: string | number | undefined) {
//     if (typeof itemId === 'undefined') {
//         return;
//     }

//     const itemStr = itemId.toString();

//     setPvSelections(
//         pvSelections.includes(itemStr)
//         ? pvSelections.filter((selection) => selection !== itemStr)
//         : [itemStr, ...pvSelections]
//     );
// }

// const pvToggle = (
//     <MenuToggle
//         ref={pvToggleRef}
//         onClick={onPvMenuToggleClick}
//         isExpanded={isPvMenuOpen}
//         {...(pvSelections.length > 0 && { badge: <Badge isRead>{pvSelections.length}</Badge> })}
//         style={
//         {
//             width: '200px'
//         } as React.CSSProperties
//         }
//     >
//         Filter by pv
//     </MenuToggle>
// );

// const pvMenu = (
//     <Menu
//         ref={pvMenuRef}
//         id="attribute-search-location-menu"
//         onSelect={onPvMenuSelect}
//         selected={pvSelections}
//     >
//         <MenuContent>
//         <MenuList>
//             {pvs.map(pv => (
//             <MenuItem 
//                 key={pv}
//                 hasCheckbox
//                 isSelected={pvSelections.includes(pv)}
//                 itemId={pv}
//             >
//                 {pv}
//             </MenuItem>
//             ))}
//         </MenuList>
//         </MenuContent>
//     </Menu>
// );

// const pvSelect = (
//     <div ref={pvContainerRef}>
//         <Popper
//         trigger={pvToggle}
//         triggerRef={pvToggleRef}
//         popper={pvMenu}
//         popperRef={pvMenuRef}
//         appendTo={pvContainerRef.current || undefined}
//         isVisible={isPvMenuOpen}
//         />
//     </div>
// );
// // Set up PV checkbox select end

// // Set up Application checkbox select
// const [isApplicationMenuOpen, setIsApplicationMenuOpen] = React.useState<boolean>(false);
// const applicationToggleRef = React.useRef<HTMLButtonElement>(null);
// const applicationMenuRef = React.useRef<HTMLDivElement>(null);
// const applicationContainerRef = React.useRef<HTMLDivElement>(null);

// const handApplicationMenuKeys = (event: KeyboardEvent) => {
//     if (isApplicationMenuOpen && applicationMenuRef.current?.contains(event.target as Node)) {
//         if (event.key === 'Escape' || event.key === 'Tab') {
//         setIsApplicationMenuOpen(!isApplicationMenuOpen);
//         applicationToggleRef.current?.focus();
//         }
//     }
// };

// const handleApplicationClickOutside = (event: MouseEvent) => {
//     if (isApplicationMenuOpen && !applicationMenuRef.current?.contains(event.target as Node)) {
//         setIsApplicationMenuOpen(false);
//     }
// };

// React.useEffect(() => {
//     window.addEventListener('keydown', handApplicationMenuKeys);
//     window.addEventListener('click', handleApplicationClickOutside);
//     return () => {
//         window.removeEventListener('keydown', handApplicationMenuKeys);
//         window.removeEventListener('click', handleApplicationClickOutside);
//     };
//     }, [isApplicationMenuOpen, applicationMenuRef]);

//     const onApplicationMenuToggleClick = (ev: React.MouseEvent) => {
//     ev.stopPropagation(); // Stop handleClickOutside from handling
//     setTimeout(() => {
//         if (applicationMenuRef.current) {
//         const firstElement = applicationMenuRef.current.querySelector('li > button:not(:disabled)');
//         firstElement && (firstElement as HTMLElement).focus();
//         }
//     }, 0);
//     setIsApplicationMenuOpen(!isApplicationMenuOpen);
// };

// function onApplicationMenuSelect(event: React.MouseEvent | undefined, itemId: string | number | undefined) {
//     if (typeof itemId === 'undefined') {
//         return;
//     }

//     const itemStr = itemId.toString();

//     setApplicationSelections(
//         applicationSelections.includes(itemStr)
//         ? applicationSelections.filter((selection) => selection !== itemStr)
//         : [itemStr, ...applicationSelections]
//     );
// }

// const applicationToggle = (
//     <MenuToggle
//         ref={applicationToggleRef}
//         onClick={onApplicationMenuToggleClick}
//         isExpanded={isApplicationMenuOpen}
//         {...(applicationSelections.length > 0 && { badge: <Badge isRead>{applicationSelections.length}</Badge> })}
//         style={
//         {
//             width: '200px'
//         } as React.CSSProperties
//         }
//     >
//         Filter by application
//     </MenuToggle>
// );

// const applicationMenu = (
//     <Menu
//         ref={applicationMenuRef}
//         id="attribute-search-location-menu"
//         onSelect={onApplicationMenuSelect}
//         selected={applicationSelections}
//     >
//         <MenuContent>
//         <MenuList>
//             {applications.map(application => (
//             <MenuItem 
//                 key={application}
//                 hasCheckbox
//                 isSelected={applicationSelections.includes(application)}
//                 itemId={application}
//             >
//                 {application}
//             </MenuItem>
//             ))}
//         </MenuList>
//         </MenuContent>
//     </Menu>
// );

// const applicationSelect = (
//     <div ref={applicationContainerRef}>
//         <Popper
//         trigger={applicationToggle}
//         triggerRef={applicationToggleRef}
//         popper={applicationMenu}
//         popperRef={applicationMenuRef}
//         appendTo={applicationContainerRef.current || undefined}
//         isVisible={isApplicationMenuOpen}
//         />
//     </div>
// );
// // Set up Application checkbox select end

// // Set up Tenant checkbox select
// const [isTenantMenuOpen, setIsTenantMenuOpen] = React.useState<boolean>(false);
// const tenantToggleRef = React.useRef<HTMLButtonElement>(null);
// const tenantMenuRef = React.useRef<HTMLDivElement>(null);
// const tenantContainerRef = React.useRef<HTMLDivElement>(null);

// const handTenantMenuKeys = (event: KeyboardEvent) => {
//     if (isTenantMenuOpen && tenantMenuRef.current?.contains(event.target as Node)) {
//         if (event.key === 'Escape' || event.key === 'Tab') {
//         setIsTenantMenuOpen(!isTenantMenuOpen);
//         tenantToggleRef.current?.focus();
//         }
//     }
// };

// const handleTenantClickOutside = (event: MouseEvent) => {
//     if (isTenantMenuOpen && !tenantMenuRef.current?.contains(event.target as Node)) {
//         setIsTenantMenuOpen(false);
//     }
// };

// React.useEffect(() => {
//     window.addEventListener('keydown', handTenantMenuKeys);
//     window.addEventListener('click', handleTenantClickOutside);
//     return () => {
//         window.removeEventListener('keydown', handTenantMenuKeys);
//         window.removeEventListener('click', handleTenantClickOutside);
//     };
//     }, [isTenantMenuOpen, tenantMenuRef]);

//     const onTenantMenuToggleClick = (ev: React.MouseEvent) => {
//     ev.stopPropagation(); // Stop handleClickOutside from handling
//     setTimeout(() => {
//         if (tenantMenuRef.current) {
//         const firstElement = tenantMenuRef.current.querySelector('li > button:not(:disabled)');
//         firstElement && (firstElement as HTMLElement).focus();
//         }
//     }, 0);
//     setIsTenantMenuOpen(!isTenantMenuOpen);
// };

// function onTenantMenuSelect(event: React.MouseEvent | undefined, itemId: string | number | undefined) {
//     if (typeof itemId === 'undefined') {
//         return;
//     }

//     const itemStr = itemId.toString();

//     setTenantSelections(
//         tenantSelections.includes(itemStr)
//         ? tenantSelections.filter((selection) => selection !== itemStr)
//         : [itemStr, ...tenantSelections]
//     );
// }

// const tenantToggle = (
//     <MenuToggle
//         ref={tenantToggleRef}
//         onClick={onTenantMenuToggleClick}
//         isExpanded={isTenantMenuOpen}
//         {...(tenantSelections.length > 0 && { badge: <Badge isRead>{tenantSelections.length}</Badge> })}
//         style={
//         {
//             width: '200px'
//         } as React.CSSProperties
//         }
//     >
//         Filter by tenant
//     </MenuToggle>
// );

// const tenantMenu = (
//     <Menu
//         ref={tenantMenuRef}
//         id="attribute-search-location-menu"
//         onSelect={onTenantMenuSelect}
//         selected={tenantSelections}
//     >
//         <MenuContent>
//         <MenuList>
//             {tenants.map(tenant => (
//             <MenuItem 
//                 key={tenant}
//                 hasCheckbox
//                 isSelected={tenantSelections.includes(tenant)}
//                 itemId={tenant}
//             >
//                 {tenant}
//             </MenuItem>
//             ))}
//         </MenuList>
//         </MenuContent>
//     </Menu>
// );

// const tenantSelect = (
//     <div ref={tenantContainerRef}>
//         <Popper
//         trigger={tenantToggle}
//         triggerRef={tenantToggleRef}
//         popper={tenantMenu}
//         popperRef={tenantMenuRef}
//         appendTo={tenantContainerRef.current || undefined}
//         isVisible={isTenantMenuOpen}
//         />
//     </div>
// );
// // Set up Tenant checkbox select end

// // Set up Product checkbox select
// const [isProductMenuOpen, setIsProductMenuOpen] = React.useState<boolean>(false);
// const productToggleRef = React.useRef<HTMLButtonElement>(null);
// const productMenuRef = React.useRef<HTMLDivElement>(null);
// const productContainerRef = React.useRef<HTMLDivElement>(null);

// const handProductMenuKeys = (event: KeyboardEvent) => {
//     if (isProductMenuOpen && productMenuRef.current?.contains(event.target as Node)) {
//         if (event.key === 'Escape' || event.key === 'Tab') {
//         setIsProductMenuOpen(!isProductMenuOpen);
//         productToggleRef.current?.focus();
//         }
//     }
// };

// const handleProductClickOutside = (event: MouseEvent) => {
//     if (isProductMenuOpen && !productMenuRef.current?.contains(event.target as Node)) {
//         setIsProductMenuOpen(false);
//     }
//     };

//     React.useEffect(() => {
//     window.addEventListener('keydown', handProductMenuKeys);
//     window.addEventListener('click', handleProductClickOutside);
//     return () => {
//         window.removeEventListener('keydown', handProductMenuKeys);
//         window.removeEventListener('click', handleProductClickOutside);
//     };
//     }, [isTenantMenuOpen, tenantMenuRef]);

// const onProductMenuToggleClick = (ev: React.MouseEvent) => {
//     ev.stopPropagation(); // Stop handleClickOutside from handling
//     setTimeout(() => {
//         if (productMenuRef.current) {
//         const firstElement = productMenuRef.current.querySelector('li > button:not(:disabled)');
//         firstElement && (firstElement as HTMLElement).focus();
//         }
//     }, 0);
//     setIsProductMenuOpen(!isProductMenuOpen);
// };

// function onProductMenuSelect(event: React.MouseEvent | undefined, itemId: string | number | undefined) {
//     if (typeof itemId === 'undefined') {
//         return;
//     }

//     const itemStr = itemId.toString();

//     setProductSelections(
//         productSelections.includes(itemStr)
//         ? productSelections.filter((selection) => selection !== itemStr)
//         : [itemStr, ...productSelections]
//     );
// }

// const productToggle = (
//     <MenuToggle
//         ref={productToggleRef}
//         onClick={onProductMenuToggleClick}
//         isExpanded={isProductMenuOpen}
//         {...(productSelections.length > 0 && { badge: <Badge isRead>{productSelections.length}</Badge> })}
//         style={
//         {
//             width: '200px'
//         } as React.CSSProperties
//         }
//     >
//         Filter by product
//     </MenuToggle>
// );

// const productMenu = (
//     <Menu
//         ref={productMenuRef}
//         id="attribute-search-location-menu"
//         onSelect={onProductMenuSelect}
//         selected={productSelections}
//     >
//         <MenuContent>
//         <MenuList>
//             {products.map(product => (
//             <MenuItem 
//                 key={product}
//                 hasCheckbox
//                 isSelected={productSelections.includes(product)}
//                 itemId={product}
//             >
//                 {product}
//             </MenuItem>
//             ))}
//         </MenuList>
//         </MenuContent>
//     </Menu>
// );

// const productSelect = (
//     <div ref={productContainerRef}>
//         <Popper
//         trigger={productToggle}
//         triggerRef={productToggleRef}
//         popper={productMenu}
//         popperRef={productMenuRef}
//         appendTo={productContainerRef.current || undefined}
//         isVisible={isProductMenuOpen}
//         />
//     </div>
// );
// // Set up Product checkbox select end

// // Set up status single select
// const [isStatusMenuOpen, setIsStatusMenuOpen] = React.useState<boolean>(false);
// const statusToggleRef = React.useRef<HTMLButtonElement>(null);
// const statusMenuRef = React.useRef<HTMLDivElement>(null);
// const statusContainerRef = React.useRef<HTMLDivElement>(null);

// const handleStatusMenuKeys = (event: KeyboardEvent) => {
//     if (isStatusMenuOpen && statusMenuRef.current?.contains(event.target as Node)) {
//         if (event.key === 'Escape' || event.key === 'Tab') {
//         setIsStatusMenuOpen(!isStatusMenuOpen);
//         statusToggleRef.current?.focus();
//         }
//     }
//     };

//     const handleStatusClickOutside = (event: MouseEvent) => {
//     if (isStatusMenuOpen && !statusMenuRef.current?.contains(event.target as Node)) {
//         setIsStatusMenuOpen(false);
//     }
// };

// React.useEffect(() => {
//     window.addEventListener('keydown', handleStatusMenuKeys);
//     window.addEventListener('click', handleStatusClickOutside);
//     return () => {
//         window.removeEventListener('keydown', handleStatusMenuKeys);
//         window.removeEventListener('click', handleStatusClickOutside);
//     };
//     }, [isStatusMenuOpen, statusMenuRef]);

//     const onStatusToggleClick = (ev: React.MouseEvent) => {
//     ev.stopPropagation(); // Stop handleClickOutside from handling
//     setTimeout(() => {
//         if (statusMenuRef.current) {
//         const firstElement = statusMenuRef.current.querySelector('li > button:not(:disabled)');
//         firstElement && (firstElement as HTMLElement).focus();
//         }
//     }, 0);
//     setIsStatusMenuOpen(!isStatusMenuOpen);
// };

// function onStatusSelect(event: React.MouseEvent | undefined, itemId: string | number | undefined) {
//     if (typeof itemId === 'undefined') {
//         return;
//     }

//     setStatusSelections(itemId.toString());
//     setIsStatusMenuOpen(!isStatusMenuOpen);
// }

// const statusToggle = (
//     <MenuToggle
//         ref={statusToggleRef}
//         onClick={onStatusToggleClick}
//         isExpanded={isStatusMenuOpen}
//         style={
//         {
//             width: '200px'
//         } as React.CSSProperties
//         }
//     >
//         Filter by status
//     </MenuToggle>
// );

// const statusMenu = (
//     <Menu ref={statusMenuRef} id="attribute-search-status-menu" onSelect={onStatusSelect} selected={statusSelections}>
//         <MenuContent>
//         <MenuList>
//             <MenuItem itemId="Succeeded">Succeeded</MenuItem>
//             <MenuItem itemId="Progressing">Progressing</MenuItem>
//             <MenuItem itemId="Failed">Failed</MenuItem>
//         </MenuList>
//         </MenuContent>
//     </Menu>
// );

// const statusSelect = (
//     <div ref={statusContainerRef}>
//         <Popper
//         trigger={statusToggle}
//         triggerRef={statusToggleRef}
//         popper={statusMenu}
//         popperRef={statusMenuRef}
//         appendTo={statusContainerRef.current || undefined}
//         isVisible={isStatusMenuOpen}
//         />
//     </div>
// );
// // Set up status selection end

// // Set up attribute selector
// const [activeAttributeMenu, setActiveAttributeMenu] = React.useState<'Product' | 'Status' | 'PV' | 'Application' | 'ReleasePlan' | 'Tenant'>('Product');
// const [isAttributeMenuOpen, setIsAttributeMenuOpen] = React.useState(false);
// const attributeToggleRef = React.useRef<HTMLButtonElement>(null);
// const attributeMenuRef = React.useRef<HTMLDivElement>(null);
// const attributeContainerRef = React.useRef<HTMLDivElement>(null);

// const handleAttribueMenuKeys = (event: KeyboardEvent) => {
//     if (!isAttributeMenuOpen) {
//         return;
//     }
//     if (
//         attributeMenuRef.current?.contains(event.target as Node) ||
//         attributeToggleRef.current?.contains(event.target as Node)
//     ) {
//         if (event.key === 'Escape' || event.key === 'Tab') {
//         setIsAttributeMenuOpen(!isAttributeMenuOpen);
//         attributeToggleRef.current?.focus();
//         }
//     }
//     };

//     const handleAttributeClickOutside = (event: MouseEvent) => {
//     if (isAttributeMenuOpen && !attributeMenuRef.current?.contains(event.target as Node)) {
//         setIsAttributeMenuOpen(false);
//     }
// };

// React.useEffect(() => {
//     window.addEventListener('keydown', handleAttribueMenuKeys);
//     window.addEventListener('click', handleAttributeClickOutside);
//     return () => {
//         window.removeEventListener('keydown', handleAttribueMenuKeys);
//         window.removeEventListener('click', handleAttributeClickOutside);
//     };
//     }, [isAttributeMenuOpen, attributeMenuRef]);

//     const onAttributeToggleClick = (ev: React.MouseEvent) => {
//     ev.stopPropagation(); // Stop handleClickOutside from handling
//     setTimeout(() => {
//         if (attributeMenuRef.current) {
//         const firstElement = attributeMenuRef.current.querySelector('li > button:not(:disabled)');
//         firstElement && (firstElement as HTMLElement).focus();
//         }
//     }, 0);
//     setIsAttributeMenuOpen(!isAttributeMenuOpen);
// };

// const attributeToggle = (
//     <MenuToggle
//         ref={attributeToggleRef}
//         onClick={onAttributeToggleClick}
//         isExpanded={isAttributeMenuOpen}
//         icon={<FilterIcon />}
//     >
//         {activeAttributeMenu}
//     </MenuToggle>
// );
// const attributeMenu = (
//     // eslint-disable-next-line no-console
//     <Menu
//         ref={attributeMenuRef}
//         onSelect={(_ev, itemId) => {
//         setActiveAttributeMenu(itemId?.toString() as 'Product' | 'Status' | 'PV' | 'Application' | 'ReleasePlan' | 'Tenant');
//         setIsAttributeMenuOpen(!isAttributeMenuOpen);
//         }}
//     >
//         <MenuContent>
//         <MenuList>
//             <MenuItem itemId="Product">Product</MenuItem>
//             <MenuItem itemId="Status">Status</MenuItem>
//             <MenuItem itemId="PV">PV</MenuItem>
//             <MenuItem itemId="Application">Application</MenuItem>
//             <MenuItem itemId="Component">Component</MenuItem>
//             <MenuItem itemId="ReleasePlan">ReleasePlan</MenuItem>
//             <MenuItem itemId="Tenant">Tenant</MenuItem>
//         </MenuList>
//         </MenuContent>
//     </Menu>
// );

// const attributeDropdown = (
//     <div ref={attributeContainerRef}>
//         <Popper
//         trigger={attributeToggle}
//         triggerRef={attributeToggleRef}
//         popper={attributeMenu}
//         popperRef={attributeMenuRef}
//         appendTo={attributeContainerRef.current || undefined}
//         isVisible={isAttributeMenuOpen}
//         />
//     </div>
// );

// const [isChecked, setIsChecked] = React.useState<boolean>(true);

// const handleChange = (_event: React.FormEvent<HTMLInputElement>, checked: boolean) => {
//     setIsChecked(checked);
// };

// const RMToolbar = (
//     <Toolbar
//         id="attribute-search-filter-toolbar"
//         clearAllFilters={() => {
//         setSearchValue('');
//         setApplicationSelections([]);
//         setTenantSelections([]);
//         setPvSelections([]);
//         setStatusSelections('');
//         setProductSelections([]);
//         }}
//     >
//         <ToolbarContent>
//         <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
//             <ToolbarGroup variant="filter-group">
//             <ToolbarItem>{attributeDropdown}</ToolbarItem>
//             <ToolbarFilter
//                 chips={searchValue !== '' ? [searchValue] : ([] as string[])}
//                 deleteChip={() => setSearchValue('')}
//                 deleteChipGroup={() => setSearchValue('')}
//                 categoryName="releaseplan"
//                 showToolbarItem={activeAttributeMenu === 'ReleasePlan'}
//             >
//                 {searchInput}
//             </ToolbarFilter>
//             <ToolbarFilter
//                 chips={statusSelections !== '' ? [statusSelections] : ([] as string[])}
//                 deleteChip={() => setStatusSelections('')}
//                 deleteChipGroup={() => setStatusSelections('')}
//                 categoryName="status"
//                 showToolbarItem={activeAttributeMenu === 'Status'}
//             >
//                 {statusSelect}
//             </ToolbarFilter>
//             <ToolbarFilter
//                 chips={pvSelections}
//                 deleteChip={(category, chip) => onPvMenuSelect(undefined, chip as string)}
//                 deleteChipGroup={() => setPvSelections([])}
//                 categoryName="pv"
//                 showToolbarItem={activeAttributeMenu === 'PV'}
//             >
//                 {pvSelect}
//             </ToolbarFilter>
//             <ToolbarFilter
//                 chips={productSelections}
//                 deleteChip={(category, chip) => onProductMenuSelect(undefined, chip as string)}
//                 deleteChipGroup={() => setProductSelections([])}
//                 categoryName="product"
//                 showToolbarItem={activeAttributeMenu === 'Product'}
//             >
//                 {productSelect}
//             </ToolbarFilter>
//             <ToolbarFilter
//                 chips={applicationSelections}
//                 deleteChip={(category, chip) => onApplicationMenuSelect(undefined, chip as string)}
//                 deleteChipGroup={() => setApplicationSelections([])}
//                 categoryName="application"
//                 showToolbarItem={activeAttributeMenu === 'Application'}
//             >
//                 {applicationSelect}
//             </ToolbarFilter>
//             <ToolbarFilter
//                 chips={tenantSelections}
//                 deleteChip={(category, chip) => onTenantMenuSelect(undefined, chip as string)}
//                 deleteChipGroup={() => setTenantSelections([])}
//                 categoryName="tenant"
//                 showToolbarItem={activeAttributeMenu === 'Tenant'}
//             >
//                 {tenantSelect}
//             </ToolbarFilter>
//             </ToolbarGroup>
//         </ToolbarToggleGroup>
//         <ToolbarItem variant="bulk-select">
//             <Switch
//             label="Show latest releases for each component"
//             labelOff="Show all releases for each component"
//             id="show-component-release"
//             aria-label="Show releases for each component"
//             isChecked={isChecked}
//             hasCheckIcon
//             onChange={handleChange}
//             />
//             </ToolbarItem>
//         <ToolbarItem variant="pagination">{toolbarPagination}</ToolbarItem>
//         </ToolbarContent>
//     </Toolbar>
// );

// export {  
//     loading,
//     setSearchValue,
//     setApplicationSelections,
//     setTenantSelections,
//     setPvSelections,
//     setStatusSelections,
//     setProductSelections,
//     filteredReleases,
// };

// export default RMToolbar;
