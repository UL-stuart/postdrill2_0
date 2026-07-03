import { loadComments, saveComments } from '../commentsStorage.js'

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
