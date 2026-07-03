import { loadComments, saveComments, groupCommentsByArea } from '../commentsStorage.js'

let store = {}

beforeAll(() => {
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: k => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v) },
      removeItem: k => { delete store[k] },
      clear: () => { store = {} }
    },
    writable: true
  })
})

beforeEach(() => { store = {} })

describe('loadComments', () => {
  it('returns empty object when no comments stored', () => {
    expect(loadComments('abc123')).toEqual({})
  })

  it('returns parsed comments for the given sessionId', () => {
    const comments = { 'marker:Leadership': { text: 'Good', createdAt: '2026-07-03T10:00:00Z' } }
    store['postdrill_comments_abc123'] = JSON.stringify(comments)
    expect(loadComments('abc123')).toEqual(comments)
  })

  it('does not return comments from a different session', () => {
    store['postdrill_comments_other'] = JSON.stringify({ 'facet:F1': { text: 'X', createdAt: '2026-07-03T10:00:00Z' } })
    expect(loadComments('abc123')).toEqual({})
  })

  it('returns empty object if stored value is invalid JSON', () => {
    store['postdrill_comments_abc123'] = 'not-json'
    expect(loadComments('abc123')).toEqual({})
  })
})

describe('saveComments', () => {
  it('persists comments to localStorage under the session key', () => {
    const comments = { 'lookingAhead': { text: 'Note', createdAt: '2026-07-03T10:00:00Z' } }
    saveComments('abc123', comments)
    expect(JSON.parse(store['postdrill_comments_abc123'])).toEqual(comments)
  })

  it('overwrites existing comments for the same session', () => {
    saveComments('abc123', { 'facet:F1': { text: 'Old', createdAt: '2026-07-03T10:00:00Z' } })
    saveComments('abc123', { 'facet:F1': { text: 'New', createdAt: '2026-07-03T10:01:00Z' } })
    expect(JSON.parse(store['postdrill_comments_abc123'])['facet:F1'].text).toBe('New')
  })

  it('does not overwrite a different session', () => {
    saveComments('abc123', { 'lookingAhead': { text: 'A', createdAt: '2026-07-03T10:00:00Z' } })
    saveComments('xyz999', { 'lookingAhead': { text: 'B', createdAt: '2026-07-03T10:00:00Z' } })
    expect(JSON.parse(store['postdrill_comments_abc123'])['lookingAhead'].text).toBe('A')
    expect(JSON.parse(store['postdrill_comments_xyz999'])['lookingAhead'].text).toBe('B')
  })
})

describe('groupCommentsByArea', () => {
  const ts = '2026-07-03T10:00:00Z'

  it('returns empty buckets for an empty comments object', () => {
    const result = groupCommentsByArea({})
    expect(result.markerCategories).toEqual([])
    expect(result.individualMarkers).toEqual([])
    expect(result.facets).toEqual([])
    expect(result.lookingAhead).toBeNull()
    expect(result.transcript).toEqual([])
  })

  it('routes marker category keys to markerCategories', () => {
    const result = groupCommentsByArea({ 'marker:Leadership': { text: 'Good', createdAt: ts } })
    expect(result.markerCategories).toHaveLength(1)
    expect(result.markerCategories[0].key).toBe('marker:Leadership')
    expect(result.markerCategories[0].text).toBe('Good')
    expect(result.individualMarkers).toHaveLength(0)
  })

  it('routes individual marker keys to individualMarkers', () => {
    const result = groupCommentsByArea({
      'marker:L3': { text: 'Note', createdAt: ts },
      'marker:C1': { text: 'Other', createdAt: ts },
    })
    expect(result.individualMarkers).toHaveLength(2)
    expect(result.markerCategories).toHaveLength(0)
  })

  it('routes facet keys to facets', () => {
    const result = groupCommentsByArea({ 'facet:F1': { text: 'Facet note', createdAt: ts } })
    expect(result.facets).toHaveLength(1)
    expect(result.facets[0].key).toBe('facet:F1')
  })

  it('captures lookingAhead as a single object', () => {
    const result = groupCommentsByArea({ 'lookingAhead': { text: 'Forward', createdAt: ts } })
    expect(result.lookingAhead).toEqual({ text: 'Forward', createdAt: ts })
  })

  it('routes tx keys to transcript with parsed index', () => {
    const result = groupCommentsByArea({ 'tx:42': { text: 'Interesting', createdAt: ts } })
    expect(result.transcript).toHaveLength(1)
    expect(result.transcript[0].index).toBe(42)
    expect(result.transcript[0].text).toBe('Interesting')
  })

  it('excludes reflections:freeform from all buckets', () => {
    const result = groupCommentsByArea({ 'reflections:freeform': { text: 'Private', createdAt: ts } })
    expect(result.markerCategories).toHaveLength(0)
    expect(result.individualMarkers).toHaveLength(0)
    expect(result.facets).toHaveLength(0)
    expect(result.lookingAhead).toBeNull()
    expect(result.transcript).toHaveLength(0)
  })

  it('handles all key types together', () => {
    const comments = {
      'marker:Mindset': { text: 'Cat', createdAt: ts },
      'marker:M2': { text: 'Ind', createdAt: ts },
      'facet:F3': { text: 'Fac', createdAt: ts },
      'lookingAhead': { text: 'Fwd', createdAt: ts },
      'tx:0': { text: 'Tx', createdAt: ts },
      'reflections:freeform': { text: 'Skip', createdAt: ts },
    }
    const result = groupCommentsByArea(comments)
    expect(result.markerCategories).toHaveLength(1)
    expect(result.individualMarkers).toHaveLength(1)
    expect(result.facets).toHaveLength(1)
    expect(result.lookingAhead).not.toBeNull()
    expect(result.transcript).toHaveLength(1)
  })
})
