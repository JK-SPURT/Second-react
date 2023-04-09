import { App, Layout, State } from '../mock/Tree.js'
import { componentTree } from '../src/componentTree.js'
import { render, screen } from './utils.js'

describe('componentTree', () => {
  it('should be defined', () => {
    expect(componentTree).toBeDefined()
  })

  it('should be render component tree with children', () => {
    const Tree = componentTree([[State, { initialValue: 'hello' }], [Layout]])

    render(
      <Tree>
        <App />
      </Tree>
    )
    expect(screen.getByLabelText('state')).toMatchSnapshot()
  })

  it('should be render component tree without children', () => {
    const Tree = componentTree([
      [State, { initialValue: 'hello' }],
      [Layout],
      [App]
    ])

    render(<Tree />)
    expect(screen.getByLabelText('state')).toMatchSnapshot()
  })
})
