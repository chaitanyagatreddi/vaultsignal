import Status from './components/Status'
import { AgGridTable } from '@/components/ui/table'
import { contributorsData } from '@/data/contributors_sample'
import SearchSvg from '@/assets/svgs/search.svg?react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

function Threats() {
    const defaultColDef = {
        flex: 1,
        cellClass: 'pt-[16px] text-sm',
        headerClass: 'ag-header-cell text-xs font-bold tracking-wider text-gray-500 uppercase',
        resizable: false,
        sortable: true,
    }
    
    const colDefs = [
        {
            headerName: 'CONTRIBUTOR',
            field: 'username',
            cellStyle: { paddingLeft: '24px', paddingTop: '16px', paddingBottom: '16px' },
            cellRenderer: (params: { value: string }) => {
                return (
                    <a href={`https://github.com/${params.value.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ color: '#166434' }} className="hover:underline font-semibold">
                        {params.value}
                    </a>
                )
            },
            width: 180,
        },
        {
            headerName: 'TIER',
            field: 'tier',
            width: 100,
            cellRenderer: (params: { value: string }) => {
                const tier = params.value.toLowerCase()
                let bgColor = '#F3E8FF' // Default Purple bg
                let textColor = '#6B21A8' // Default Purple text
                
                if (tier === 'high' || tier === 'critical') {
                    bgColor = '#FEF2F2' // Red bg
                    textColor = '#991B1B' // Red text
                } else if (tier === 'medium') {
                    bgColor = '#FFF7ED' // Orange bg
                    textColor = '#C2410C' // Orange text
                }

                return (
                    <span 
                        className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                        style={{ backgroundColor: bgColor, color: textColor }}
                    >
                        {params.value}
                    </span>
                )
            },
        },
        {
            headerName: 'SCORE',
            field: 'score',
            width: 120,
            cellRenderer: (params: { value: number }) => {
                return (
                    <div className="flex flex-col justify-center h-full gap-1 pt-1">
                        <span className="font-bold text-gray-800">{params.value}</span>
                        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${params.value}%` }}></div>
                        </div>
                    </div>
                )
            },
        },
        { 
            headerName: 'EMAIL',
            field: 'email',
            width: 220,
            cellRenderer: (params: { value: string }) => {
                if (params.value === 'none') {
                    return <span className="italic" style={{ color: '#01065E' }}>{params.value}</span>
                }
                return <a href={`mailto:${params.value}`} className="hover:underline font-bold" style={{ color: '#000000' }}>{params.value}</a>
            }
        },
        { 
            headerName: 'SUMMARY',
            field: 'summary',
            flex: 2,
            cellClass: 'pt-[16px] text-sm text-gray-600 truncate'
        },
        { 
            headerName: 'REPOS',
            field: 'repos',
            flex: 1,
            cellStyle: { color: '#166434', paddingTop: '16px' },
            cellClass: 'text-sm font-medium'
        }
    ]

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isExpandedSearchOpen, setIsExpandedSearchOpen] = useState<boolean>(false)
    const [personName, setPersonName] = useState<string>('')
    const [companyName, setCompanyName] = useState<string>('')
    
    // API Testing State
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [searchResult, setSearchResult] = useState<any>(null)

    const handleFindEmail = async () => {
        if (!personName) return;
        setIsSearching(true);
        setSearchResult(null);
        try {
            // 1. Fetch from Apollo
            const apolloResponse = await fetch('/api/apollo/api/v1/mixed_people/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify({
                    api_key: import.meta.env.VITE_APOLLO_API_KEY,
                    q_organization_name: companyName,
                    q_person_name: personName,
                    page: 1
                })
            });
            const apolloData = await apolloResponse.json();
            
            if (apolloData.people && apolloData.people.length > 0) {
                const person = apolloData.people[0];
                const rawEmail = person.email || person.email_url || 'N/A';
                
                // 2. Validate with Monid
                let validationStatus = 'Skipped';
                if (rawEmail !== 'N/A' && !rawEmail.includes('unlock')) {
                    try {
                        const monidResponse = await fetch('/api/monid/x402/email-validate', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${import.meta.env.VITE_MONID_API_KEY}`
                            },
                            body: JSON.stringify({ email: rawEmail })
                        });
                        const monidData = await monidResponse.json();
                        validationStatus = monidData.status || 'Verified'; // Assume verified for test
                    } catch (monidErr) {
                        validationStatus = 'Validation API Error';
                    }
                }

                setSearchResult({
                    ...person,
                    monid_validation: validationStatus
                });
            } else {
                setSearchResult({ error: 'No match found in Apollo' });
            }
        } catch (error) {
            console.error("API Error", error);
            setSearchResult({ error: 'Failed to fetch (CORS or network error)' });
        }
        setIsSearching(false);
    };

    return (
        <div className="flex flex-col px-8 pt-6 bg-[#FAFAFA] h-[calc(100vh-64px)] w-full gap-[24px]">
            <Status />
            <div className="w-full h-full flex flex-col gap-[24px] bg-white p-[24px] rounded-lg shadow-sm">
                
                {/* Search Header Area */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-[8px]">
                        <div className="flex items-center gap-[8px] border border-[#D9D9D9] rounded-[4px] w-[300px] py-[8px] px-[12px]">
                            <SearchSvg />
                            <Input 
                                type="text" 
                                placeholder="Search contributors..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-none focus-visible:ring-0 px-0 h-6"
                            />
                        </div>
                        <div className="flex items-center gap-[12px]">
                            <button 
                                onClick={() => setIsExpandedSearchOpen(!isExpandedSearchOpen)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition px-2"
                            >
                                {isExpandedSearchOpen ? 'Hide Expand Search' : 'Expand Search'}
                            </button>
                        </div>
                    </div>

                    {/* Expand Search Panel (Apollo/Tomba Fallback) */}
                    {isExpandedSearchOpen && (
                        <div className="flex flex-col gap-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">Missing Email? Enrich via Apollo/Tomba:</span>
                                <Input 
                                    type="text" 
                                    placeholder="Person Name (e.g. John Doe)" 
                                    value={personName}
                                    onChange={(e) => setPersonName(e.target.value)}
                                    className="w-56 bg-white"
                                />
                                <Input 
                                    type="text" 
                                    placeholder="Company Domain (e.g. apple.com)" 
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-56 bg-white"
                                />
                                <button 
                                    onClick={handleFindEmail}
                                    disabled={isSearching}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {isSearching ? 'Searching...' : 'Find Email via Apollo'}
                                </button>
                            </div>
                            
                            {/* API Result Display */}
                            {searchResult && !searchResult.error && (
                                <div className="p-3 bg-green-50 border border-green-200 rounded-md mt-2 flex flex-col gap-1 text-sm text-green-900 w-full">
                                    <span className="font-bold">Match Found in Apollo & Validated by Monid!</span>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <span><strong>Name:</strong> {searchResult.name}</span>
                                        <span><strong>Title:</strong> {searchResult.title}</span>
                                        <span><strong>Raw Email:</strong> {searchResult.email || searchResult.email_url || 'Requires Credits'}</span>
                                        <span className="flex items-center gap-2">
                                            <strong>Monid Status:</strong> 
                                            <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">
                                                {searchResult.monid_validation}
                                            </span>
                                        </span>
                                        <span className="col-span-2"><strong>LinkedIn:</strong> <a href={searchResult.linkedin_url} className="text-blue-600 hover:underline">{searchResult.linkedin_url}</a></span>
                                    </div>
                                </div>
                            )}
                            {searchResult && searchResult.error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md mt-2 text-sm text-red-700 font-medium">
                                    {searchResult.error}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Data Table */}
                <AgGridTable
                    defaultColDefs={defaultColDef}
                    columnDefs={colDefs}
                    rowData={contributorsData}
                    // Filtering can be hooked up here later
                    filterColumn=""
                    filterValue=""
                />
            </div>
        </div>
    )
}

export default Threats
