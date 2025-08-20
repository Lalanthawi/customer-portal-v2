import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import GroupSelector from '../components/GroupSelector'
import { GroupId, GroupInfo } from '../types'

describe('GroupSelector', () => {
  const mockGroups = new Map<GroupId, GroupInfo>([
    ['A', {
      groupId: 'A',
      currentHighestBid: 500000,
      totalBidders: 5,
      status: 'available',
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }],
    ['B', {
      groupId: 'B',
      currentHighestBid: 750000,
      totalBidders: 8,
      status: 'winning',
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      yourBid: {
        id: 'bid-1',
        groupId: 'B',
        bidAmount: 750000,
        quantity: 1,
        totalAmount: 750000,
        status: 'winning',
        timestamp: new Date()
      }
    }],
    ['C', {
      groupId: 'C',
      currentHighestBid: 600000,
      totalBidders: 3,
      status: 'outbid',
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      yourBid: {
        id: 'bid-2',
        groupId: 'C',
        bidAmount: 550000,
        quantity: 1,
        totalAmount: 550000,
        status: 'outbid',
        timestamp: new Date()
      }
    }]
  ])

  const mockOnGroupSelect = jest.fn()

  beforeEach(() => {
    mockOnGroupSelect.mockClear()
  })

  it('renders all 26 group buttons', () => {
    render(
      <GroupSelector
        groups={mockGroups}
        selectedGroup={null}
        onGroupSelect={mockOnGroupSelect}
      />
    )

    // Check for specific groups
    expect(screen.getByRole('button', { name: /Group A/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Group Z/i })).toBeInTheDocument()
    
    // Count total buttons (26 groups)
    const buttons = screen.getAllByRole('button')
    expect(buttons.filter(btn => btn.textContent?.match(/^[A-Z]$/))).toHaveLength(26)
  })

  it('calls onGroupSelect when a group is clicked', () => {
    render(
      <GroupSelector
        groups={mockGroups}
        selectedGroup={null}
        onGroupSelect={mockOnGroupSelect}
      />
    )

    const groupAButton = screen.getByRole('button', { name: /Group A/i })
    fireEvent.click(groupAButton)

    expect(mockOnGroupSelect).toHaveBeenCalledWith('A')
    expect(mockOnGroupSelect).toHaveBeenCalledTimes(1)
  })

  it('displays selected group information', () => {
    render(
      <GroupSelector
        groups={mockGroups}
        selectedGroup="A"
        onGroupSelect={mockOnGroupSelect}
      />
    )

    expect(screen.getByText(/Group A/)).toBeInTheDocument()
    expect(screen.getByText(/¥500,000/)).toBeInTheDocument()
    expect(screen.getByText(/5 bidders/)).toBeInTheDocument()
  })

  it('shows correct visual states for different bid statuses', () => {
    render(
      <GroupSelector
        groups={mockGroups}
        selectedGroup={null}
        onGroupSelect={mockOnGroupSelect}
      />
    )

    // Check for status indicators
    const groupBButton = screen.getByRole('button', { name: /Group B.*active bid/i })
    const groupCButton = screen.getByRole('button', { name: /Group C.*active bid/i })

    // Group B should have winning styles
    expect(groupBButton.className).toContain('from-green-500')
    
    // Group C should have outbid styles
    expect(groupCButton.className).toContain('from-red-500')
  })

  it('disables all buttons when disabled prop is true', () => {
    render(
      <GroupSelector
        groups={mockGroups}
        selectedGroup={null}
        onGroupSelect={mockOnGroupSelect}
        disabled={true}
      />
    )

    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      if (button.textContent?.match(/^[A-Z]$/)) {
        expect(button).toBeDisabled()
      }
    })
  })

  it('displays legend for different status colors', () => {
    render(
      <GroupSelector
        groups={mockGroups}
        selectedGroup={null}
        onGroupSelect={mockOnGroupSelect}
      />
    )

    expect(screen.getByText('Winning')).toBeInTheDocument()
    expect(screen.getByText('Outbid')).toBeInTheDocument()
    expect(screen.getByText('Has Bid')).toBeInTheDocument()
  })
})