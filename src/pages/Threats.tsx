import Status from './components/Status'
import { AgGridTable } from '@/components/ui/table'
import {
    contributorsData,
    type Contributor,
} from '@/data/contributors_sample'
import SearchSvg from '@/assets/svgs/search.svg?react'
import { Input } from '@/components/ui/input'
import { useEffect, useMemo, useRef, useState } from 'react'
import SelectWrapper from '@/components/wrappers/SelectWrapper'

type StreamContributor = {
    username?: string
    tier?: string
    activity_score?: number
    email?: string
    summary?: string
    bio?: string
    repos_contributed?: string[]
    profile_url?: string
}

function normalizeTier(tier?: string): Contributor['tier'] {
    const t = (tier || 'active').toLowerCase()
    if (t === 'core' || t === 'active' || t === 'emerging') return t
    if (t === 'critical') return 'core'
    if (t === 'high') return 'active'
    return 'emerging'
}

type ActivityLine = {
    id: number
    time: string
    text: string
    kind: 'info' | 'ok' | 'warn' | 'error'
}

function formatActivityTime() {
    return new Date().toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
    })
}

function cleanActivityText(text: string) {
    return text.replace(/^[^\w@[]+/, '').trim() || text
}

function activityKind(type: string, text: string): ActivityLine['kind'] {
    if (type === 'error') return 'error'
    if (type === 'email_none' || text.toLowerCase().includes('not found')) {
        return 'warn'
    }
    if (
        type === 'email_found' ||
        type === 'repos_found' ||
        type === 'complete' ||
        type === 'scored'
    ) {
        return 'ok'
    }
    return 'info'
}

function mapStreamContributors(list: StreamContributor[]): Contributor[] {
    return list.map((c, i) => ({
        id: String(i + 1),
        username: c.username?.startsWith('@')
            ? c.username
            : `@${c.username || 'unknown'}`,
        tier: normalizeTier(c.tier),
        score: Math.min(100, Math.round(c.activity_score || 0)),
        email: c.email || 'none',
        summary: c.summary || c.bio || 'No summary',
        repos: (c.repos_contributed || []).join(', ') || '—',
    }))
}

const LINK_BLUE = '#007aff'

function TierPill({ value }: { value: string }) {
    const tier = value.toLowerCase()
    // Map contributor tiers onto Threats severity pill language from Figma
    let bg = '#F3EAB4'
    let color = '#854D0F'
    if (tier === 'core' || tier === 'critical') {
        bg = '#FEE2E1'
        color = '#991B1B'
    } else if (tier === 'active' || tier === 'high') {
        bg = '#FFEDD5'
        color = '#9A3413'
    } else if (tier === 'emerging' || tier === 'medium') {
        bg = '#F3EAB4'
        color = '#854D0F'
    }
    return (
        <span
            className="inline-flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full text-[12px] font-medium capitalize leading-4"
            style={{ backgroundColor: bg, color }}
        >
            <span
                className="inline-flex size-4 items-center justify-center rounded-full text-[10px] font-bold"
                style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
            >
                !
            </span>
            {value}
        </span>
    )
}

function Threats() {
    const defaultColDef = {
        flex: 1,
        cellClass: 'pt-[14px] text-[15px]',
        headerClass: 'ag-header-cell text-[13px] font-normal text-[#757575]',
        resizable: false,
        sortable: true,
    }

    const colDefs = [
        {
            headerName: 'Contributor',
            field: 'username',
            cellStyle: {
                paddingLeft: '24px',
                paddingTop: '14px',
                paddingBottom: '14px',
            },
            cellRenderer: (params: { value: string }) => (
                <a
                    href={`https://github.com/${params.value.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: LINK_BLUE }}
                    className="hover:underline font-normal tracking-tight"
                >
                    {params.value}
                </a>
            ),
            width: 180,
        },
        {
            headerName: 'Tier',
            field: 'tier',
            width: 130,
            cellRenderer: (params: { value: string }) => (
                <TierPill value={params.value} />
            ),
        },
        {
            headerName: 'Score',
            field: 'score',
            width: 120,
            cellRenderer: (params: { value: number }) => (
                <div className="flex flex-col justify-center h-full gap-1.5 pt-0.5">
                    <span className="font-medium text-[#1E1E1E] text-[15px]">
                        {params.value}
                    </span>
                    <div className="w-16 h-1 bg-[#E4E4E7] rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${params.value}%`,
                                backgroundColor: LINK_BLUE,
                            }}
                        />
                    </div>
                </div>
            ),
        },
        {
            headerName: 'Email',
            field: 'email',
            width: 220,
            cellRenderer: (params: { value: string }) => {
                if (params.value === 'none') {
                    return (
                        <span className="italic text-[#757575]">
                            {params.value}
                        </span>
                    )
                }
                return (
                    <a
                        href={`mailto:${params.value}`}
                        className="hover:underline"
                        style={{ color: LINK_BLUE }}
                    >
                        {params.value}
                    </a>
                )
            },
        },
        {
            headerName: 'Summary',
            field: 'summary',
            flex: 2,
            cellClass: 'pt-[14px] text-[14px] text-[#555B62] truncate',
        },
        {
            headerName: 'Repos',
            field: 'repos',
            flex: 1,
            cellStyle: { paddingTop: '14px' },
            cellRenderer: (params: { value: string }) => (
                <a
                    href={`https://github.com/${params.value}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: LINK_BLUE }}
                    className="hover:underline"
                >
                    {params.value}
                </a>
            ),
        },
    ]

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [tierFilter, setTierFilter] = useState<string>('all')
    const [isExpandedSearchOpen, setIsExpandedSearchOpen] = useState(false)
    const [techstackQuery, setTechstackQuery] = useState('semiconductor')
    const [personName, setPersonName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [reposToScan, setReposToScan] = useState<5 | 10>(5)
    const [contributorsPerRepo, setContributorsPerRepo] = useState<5 | 8 | 10>(8)
    const [isScanning, setIsScanning] = useState(false)
    const [pipelineStep, setPipelineStep] = useState('idle')
    const [scanStatus, setScanStatus] = useState('')
    const [scanError, setScanError] = useState('')
    const [activityLog, setActivityLog] = useState<ActivityLine[]>([])
    const [rows, setRows] = useState<Contributor[]>(contributorsData)
    const [isSearching, setIsSearching] = useState(false)
    const [searchResult, setSearchResult] = useState<any>(null)
    const eventSourceRef = useRef<EventSource | null>(null)
    const activityEndRef = useRef<HTMLDivElement | null>(null)
    const activityIdRef = useRef(0)

    const pushActivity = (text: string, kind: ActivityLine['kind'] = 'info') => {
        if (!text.trim()) return
        activityIdRef.current += 1
        const line: ActivityLine = {
            id: activityIdRef.current,
            time: formatActivityTime(),
            text: cleanActivityText(text),
            kind,
        }
        setActivityLog((prev) => [...prev.slice(-200), line])
    }

    const POPULAR_TOOLS = [
        'OWASP ZAP',
        'Nuclei',
        'Metasploit',
        'Nmap',
        'Burp Suite',
        'Trivy',
        'Semgrep',
        'Snyk',
        'Wireshark',
        'sqlmap',
    ]

    const PIPELINE = [
        'Browser',
        'Repos',
        'Contributors',
        'Profiles',
        'Analysis',
    ] as const

    useEffect(() => {
        return () => {
            eventSourceRef.current?.close()
        }
    }, [])

    useEffect(() => {
        activityEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [activityLog])

    const filteredRows = useMemo(() => {
        const q = searchTerm.trim().toLowerCase()
        return rows.filter((row) => {
            const tierOk =
                tierFilter === 'all' ||
                row.tier.toLowerCase() === tierFilter.toLowerCase()
            if (!tierOk) return false
            if (!q) return true
            return (
                row.username.toLowerCase().includes(q) ||
                row.email.toLowerCase().includes(q) ||
                row.repos.toLowerCase().includes(q) ||
                row.summary.toLowerCase().includes(q) ||
                row.tier.toLowerCase().includes(q)
            )
        })
    }, [rows, searchTerm, tierFilter])

    const handleScanGitHub = () => {
        if (!techstackQuery.trim()) return

        eventSourceRef.current?.close()
        setIsScanning(true)
        setPipelineStep('Browser')
        setScanStatus('Starting scan…')
        setScanError('')
        setActivityLog([])
        activityIdRef.current = 0
        pushActivity(`Starting scan for “${techstackQuery.trim()}”…`, 'info')

        const params = new URLSearchParams({
            keyword: techstackQuery.trim(),
            max_repos: String(reposToScan),
            max_contributors: String(contributorsPerRepo),
            sources: 'github,website,stackoverflow,websearch',
        })

        // Same-origin via Vite proxy — avoids EventSource CORS CLOSED (docs recommendation)
        const streamUrl = `/api/github/stream?${params.toString()}`
        const es = new EventSource(streamUrl)
        eventSourceRef.current = es
        let gotMessage = false
        let settled = false

        const settleError = () => {
            if (settled) return
            settled = true
            setScanError("Couldn't reach the scanner. Please try again.")
            setIsScanning(false)
            setPipelineStep('idle')
            es.close()
            eventSourceRef.current = null
        }

        // If nothing arrives quickly, backend is down
        const connectTimer = window.setTimeout(() => {
            if (!gotMessage) settleError()
        }, 4000)

        es.onmessage = (e) => {
            gotMessage = true
            window.clearTimeout(connectTimer)
            try {
                const msg = JSON.parse(e.data) as {
                    type?: string
                    message?: string
                    data?: {
                        top_contributors?: StreamContributor[]
                    }
                }
                const type = msg.type || ''
                const text = msg.message || ''

                if (text) {
                    pushActivity(text, activityKind(type, text))
                }

                // Short status line under pipeline
                if (type === 'agent' || type === 'scanning_repo') {
                    setScanStatus('Searching GitHub…')
                }
                if (type === 'repos_found') setScanStatus('Repos found')
                if (type === 'contributors_found') {
                    setScanStatus('Mapping contributors…')
                }
                if (type === 'profiling' || type === 'crawling_email') {
                    setScanStatus('Enriching profiles…')
                }
                if (type === 'analyzing' || type === 'scored') {
                    setScanStatus('Scoring contributors…')
                }

                if (type === 'agent' && text.includes('Browserbase')) {
                    setPipelineStep('Browser')
                }
                if (
                    type === 'agent' &&
                    (text.includes('Crawl4AI') ||
                        text.includes('Browser connected'))
                ) {
                    setPipelineStep('Browser')
                }
                if (type === 'scanning_repo' || type === 'repos_found') {
                    setPipelineStep('Repos')
                }
                if (type === 'contributors_found') {
                    setPipelineStep('Contributors')
                }
                if (type === 'profiling' || type === 'crawling_email') {
                    setPipelineStep('Profiles')
                }
                if (type === 'analyzing' || type === 'scored') {
                    setPipelineStep('Analysis')
                }

                if (type === 'complete' && msg.data?.top_contributors) {
                    settled = true
                    setRows(mapStreamContributors(msg.data.top_contributors))
                    setPipelineStep('done')
                    setIsScanning(false)
                    setScanStatus(
                        `Found ${msg.data.top_contributors.length} contributors`
                    )
                    pushActivity(
                        `Done — ${msg.data.top_contributors.length} contributors ready`,
                        'ok'
                    )
                    es.close()
                    eventSourceRef.current = null
                }

                if (type === 'error') {
                    settled = true
                    setScanError('Scan failed. Please try again.')
                    setIsScanning(false)
                    setPipelineStep('idle')
                    pushActivity(text || 'Scan failed', 'error')
                    es.close()
                    eventSourceRef.current = null
                }
            } catch (err) {
                console.error(err)
            }
        }

        es.onerror = () => {
            window.clearTimeout(connectTimer)
            if (!gotMessage) {
                settleError()
                return
            }
            if (!settled) {
                settled = true
                setScanStatus((s) => s || 'Scan finished')
                setIsScanning(false)
            }
            es.close()
            eventSourceRef.current = null
        }
    }

    const handleFindEmail = async () => {
        if (!personName) return
        setIsSearching(true)
        setSearchResult(null)
        try {
            const apolloResponse = await fetch(
                '/api/apollo/api/v1/mixed_people/search',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                    },
                    body: JSON.stringify({
                        api_key: import.meta.env.VITE_APOLLO_API_KEY,
                        q_organization_name: companyName,
                        q_person_name: personName,
                        page: 1,
                    }),
                }
            )
            const apolloData = await apolloResponse.json()

            if (apolloData.people && apolloData.people.length > 0) {
                const person = apolloData.people[0]
                const rawEmail = person.email || person.email_url || 'N/A'

                let validationStatus = 'Skipped'
                if (rawEmail !== 'N/A' && !rawEmail.includes('unlock')) {
                    try {
                        const monidResponse = await fetch(
                            '/api/monid/x402/email-validate',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${import.meta.env.VITE_MONID_API_KEY}`,
                                },
                                body: JSON.stringify({ email: rawEmail }),
                            }
                        )
                        const monidData = await monidResponse.json()
                        validationStatus = monidData.status || 'Verified'
                    } catch {
                        validationStatus = 'Validation API Error'
                    }
                }

                setSearchResult({
                    ...person,
                    monid_validation: validationStatus,
                })
            } else {
                setSearchResult({ error: 'No match found in Apollo' })
            }
        } catch (error) {
            console.error('API Error', error)
            setSearchResult({
                error: 'Failed to fetch (CORS or network error)',
            })
        }
        setIsSearching(false)
    }

    const filterBtn =
        'bg-white border border-[#D9D9D9] rounded-[8px] pl-4 pr-3 py-2 text-[15px] text-[#757575] flex items-center gap-2 shrink-0'

    return (
        <div className="flex flex-col px-8 pt-4 pb-6 bg-[#FAFAFA] min-h-[calc(100vh-64px)] w-full gap-4">
            <Status />

            {/* Compact GitRadar strip — secondary to Figma table shell */}
            <div className="w-full bg-white border border-[#D9D9D9] rounded-[12px] p-4 flex flex-col gap-3">
                <div>
                    <p className="text-[14px] font-semibold text-[#0E793C]">
                        GitRadar scan
                    </p>
                    <p className="text-[12px] text-[#12A150]">
                        Techstack → repos → top contributors
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {POPULAR_TOOLS.map((tool) => {
                        const active =
                            techstackQuery.toLowerCase() === tool.toLowerCase()
                        return (
                            <button
                                key={tool}
                                type="button"
                                onClick={() => setTechstackQuery(tool)}
                                className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition ${
                                    active
                                        ? 'bg-[#007aff] border-[#007aff] text-white'
                                        : 'bg-white border-[#E4E4E7] text-[#3F3F46] hover:border-[#007aff]/60'
                                }`}
                            >
                                {tool}
                            </button>
                        )
                    })}
                </div>

                {/* Keyword + Scan + option buttons */}
                <div className="flex flex-wrap items-center gap-2">
                    <div
                        className="inline-flex items-center gap-2 border border-[#D9D9D9] rounded-[8px] bg-white py-2 px-3 h-10"
                        style={{
                            width: `min(100%, max(11rem, ${Math.max(
                                techstackQuery.length,
                                12
                            ) + 4}ch))`,
                        }}
                    >
                        <SearchSvg className="shrink-0 size-4 opacity-60" />
                        <Input
                            type="text"
                            placeholder="Keyword / techstack"
                            value={techstackQuery}
                            onChange={(e) => setTechstackQuery(e.target.value)}
                            className="border-none focus-visible:ring-0 px-0 h-6 shadow-none w-full min-w-0 text-[13px]"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleScanGitHub}
                        disabled={isScanning || !techstackQuery.trim()}
                        className="h-10 px-4 rounded-[8px] text-[13px] font-semibold text-white disabled:opacity-50 shrink-0"
                        style={{ backgroundColor: '#007aff' }}
                    >
                        {isScanning ? 'Scanning…' : 'Scan'}
                    </button>

                    <span className="hidden sm:block w-px h-6 bg-[#E4E4E7] mx-1" />

                    {([5, 10] as const).map((n) => {
                        const active = reposToScan === n
                        return (
                            <button
                                key={`repos-${n}`}
                                type="button"
                                onClick={() => setReposToScan(n)}
                                className="h-10 px-3 rounded-[8px] text-[12px] font-semibold border shrink-0 transition"
                                style={
                                    active
                                        ? {
                                              backgroundColor: '#007aff',
                                              borderColor: '#007aff',
                                              color: '#ffffff',
                                          }
                                        : {
                                              backgroundColor: '#ffffff',
                                              borderColor: '#D9D9D9',
                                              color: '#3F3F46',
                                          }
                                }
                            >
                                {n} repos
                            </button>
                        )
                    })}

                    {([5, 8, 10] as const).map((n) => {
                        const active = contributorsPerRepo === n
                        return (
                            <button
                                key={`contrib-${n}`}
                                type="button"
                                onClick={() => setContributorsPerRepo(n)}
                                className="h-10 px-3 rounded-[8px] text-[12px] font-semibold border shrink-0 transition"
                                style={
                                    active
                                        ? {
                                              backgroundColor: '#007aff',
                                              borderColor: '#007aff',
                                              color: '#ffffff',
                                          }
                                        : {
                                              backgroundColor: '#ffffff',
                                              borderColor: '#D9D9D9',
                                              color: '#3F3F46',
                                          }
                                }
                            >
                                {n} / repo
                            </button>
                        )
                    })}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {PIPELINE.map((step, idx) => {
                        const activeIdx = PIPELINE.indexOf(
                            pipelineStep as (typeof PIPELINE)[number]
                        )
                        const done =
                            pipelineStep === 'done' ||
                            (activeIdx >= 0 && idx < activeIdx)
                        const active = pipelineStep === step
                        return (
                            <div key={step} className="flex items-center gap-2">
                                <span
                                    className={`px-2.5 py-1 rounded-[6px] text-[11px] font-medium border ${
                                        active
                                            ? 'border-[#A2E9C1] bg-[#E8FAF0] text-[#0E793C]'
                                            : done
                                              ? 'border-[#A2E9C1] bg-white text-[#0E793C]'
                                              : 'border-[#E4E4E7] bg-white text-[#71717A]'
                                    }`}
                                >
                                    {step}
                                </span>
                                {idx < PIPELINE.length - 1 && (
                                    <span className="text-[#D9D9D9] text-[11px]">
                                        →
                                    </span>
                                )}
                            </div>
                        )
                    })}
                </div>

                {scanStatus && !scanError && (
                    <p className="text-[12px] text-[#52525B] truncate">
                        {scanStatus}
                    </p>
                )}
                {scanError && (
                    <div className="rounded-[8px] border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[12px] text-[#991B1B]">
                        {scanError}
                    </div>
                )}
            </div>

            {/* Figma Threats table card */}
            <div className="w-full flex-1 flex flex-col gap-4 bg-white pt-6 px-6 pb-4 rounded-t-[12px] border border-[#D9D9D9] shadow-[0_1px_2px_rgba(0,0,0,0.04)] min-h-0">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 border border-[#D9D9D9] rounded-[8px] w-[260px] py-2 pl-3 pr-4 bg-white">
                        <SearchSvg className="size-4 shrink-0 opacity-60" />
                        <Input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-none focus-visible:ring-0 px-0 h-5 shadow-none text-[15px] placeholder:text-[#B3B3B3]"
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <button type="button" className={filterBtn}>
                            Select Date
                            <span className="text-[#757575] text-[12px]">▾</span>
                        </button>
                        <SelectWrapper
                            items={[
                                { value: 'all', placeHolder: 'Tier' },
                                { value: 'core', placeHolder: 'Core' },
                                { value: 'active', placeHolder: 'Active' },
                                { value: 'emerging', placeHolder: 'Emerging' },
                            ]}
                            selectState={setTierFilter}
                            label="Tier"
                            width="7.5rem"
                        />
                        <button type="button" className={filterBtn}>
                            Repo
                            <span className="text-[#757575] text-[12px]">▾</span>
                        </button>
                        <button type="button" className={filterBtn}>
                            Status
                            <span className="text-[#757575] text-[12px]">▾</span>
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setIsExpandedSearchOpen(!isExpandedSearchOpen)
                            }
                            className={`h-[38px] px-3 rounded-[8px] text-[13px] font-medium border transition ${
                                isExpandedSearchOpen
                                    ? 'bg-[#E8FAF0] border-[#A2E9C1] text-[#0E793C]'
                                    : 'bg-white border-[#D9D9D9] text-[#18181B] hover:bg-[#F4F4F5]'
                            }`}
                        >
                            {isExpandedSearchOpen
                                ? 'Hide Expand Search'
                                : 'Expand Search'}
                        </button>
                    </div>
                </div>

                {isExpandedSearchOpen && (
                    <div className="rounded-[8px] border border-[#D9D9D9] bg-[#FAFAFA] p-4 flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-[13px] font-semibold text-[#18181B]">
                                Expand Search
                            </p>
                            <p className="text-[12px] text-[#71717A]">
                                Missing emails — enrich via Apollo / Tomba,
                                validate with Monid.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-end">
                            <div className="border border-[#D9D9D9] rounded-[8px] bg-white py-2 px-3">
                                <Input
                                    type="text"
                                    placeholder="Person name"
                                    value={personName}
                                    onChange={(e) =>
                                        setPersonName(e.target.value)
                                    }
                                    className="border-none focus-visible:ring-0 px-0 h-6 shadow-none"
                                />
                            </div>
                            <div className="border border-[#D9D9D9] rounded-[8px] bg-white py-2 px-3">
                                <Input
                                    type="text"
                                    placeholder="Company domain"
                                    value={companyName}
                                    onChange={(e) =>
                                        setCompanyName(e.target.value)
                                    }
                                    className="border-none focus-visible:ring-0 px-0 h-6 shadow-none"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleFindEmail}
                                disabled={isSearching || !personName}
                                className="h-10 px-4 rounded-[8px] text-[13px] font-semibold text-white disabled:opacity-50"
                                style={{ backgroundColor: '#007aff' }}
                            >
                                {isSearching ? 'Searching…' : 'Find email'}
                            </button>
                        </div>

                        {searchResult && !searchResult.error && (
                            <div className="rounded-[8px] border border-[#D9D9D9] bg-white p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                                <div>
                                    <p className="text-[11px] text-[#757575] mb-1">
                                        Name
                                    </p>
                                    <p className="font-semibold text-[#18181B]">
                                        {searchResult.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-[#757575] mb-1">
                                        Email
                                    </p>
                                    <p style={{ color: LINK_BLUE }}>
                                        {searchResult.email ||
                                            searchResult.email_url ||
                                            'Requires credits'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-[#757575] mb-1">
                                        Monid
                                    </p>
                                    <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#CFF7D3] text-[#0F5132]">
                                        {searchResult.monid_validation}
                                    </span>
                                </div>
                            </div>
                        )}

                        {searchResult?.error && (
                            <div className="rounded-[8px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] font-medium text-[#991B1B]">
                                {searchResult.error}
                            </div>
                        )}
                    </div>
                )}

                {/* Live activity — fills the blank while scanning (GitRadar-style) */}
                {(isScanning || activityLog.length > 0) && (
                    <div className="rounded-[10px] border border-[#30363d] bg-[#0d1117] overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#30363d]">
                            <p className="text-[12px] font-semibold tracking-wide text-[#e6edf3]">
                                ACTIVITY
                            </p>
                            {isScanning && (
                                <span className="text-[11px] text-[#3fb950] animate-pulse">
                                    live
                                </span>
                            )}
                        </div>
                        <div className="max-h-[280px] overflow-y-auto px-4 py-3 font-mono text-[12px] leading-5">
                            {activityLog.length === 0 && (
                                <p className="text-[#8b949e]">
                                    Waiting for scanner…
                                </p>
                            )}
                            {activityLog.map((line) => (
                                <div
                                    key={line.id}
                                    className="flex gap-3 py-0.5"
                                >
                                    <span className="shrink-0 text-[#8b949e] tabular-nums">
                                        {line.time}
                                    </span>
                                    <span
                                        className={
                                            line.kind === 'ok'
                                                ? 'text-[#3fb950]'
                                                : line.kind === 'warn'
                                                  ? 'text-[#d29922]'
                                                  : line.kind === 'error'
                                                    ? 'text-[#f85149]'
                                                    : 'text-[#e6edf3]'
                                        }
                                    >
                                        {line.text}
                                    </span>
                                </div>
                            ))}
                            <div ref={activityEndRef} />
                        </div>
                    </div>
                )}

                {!isScanning && (
                    <AgGridTable
                        defaultColDefs={defaultColDef}
                        columnDefs={colDefs}
                        rowData={filteredRows}
                        filterColumn=""
                        filterValue=""
                    />
                )}

                {isScanning && (
                    <p className="text-[12px] text-[#71717A]">
                        Results appear here when the scan finishes.
                    </p>
                )}
            </div>
        </div>
    )
}

export default Threats
