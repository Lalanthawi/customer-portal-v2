import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import BidForm from '../components/BidForm'

describe('BidForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders all form elements', () => {
    render(
      <BidForm
        selectedGroup="A"
        onSubmit={mockOnSubmit}
        isSubmitting={false}
      />
    )

    expect(screen.getByText('Place Your Bid')).toBeInTheDocument()
    expect(screen.getByText('Selected Group')).toBeInTheDocument()
    expect(screen.getByText('Group A')).toBeInTheDocument()
    expect(screen.getByLabelText(/Bid Amount/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Place Bid/i })).toBeInTheDocument()
  })

  it('displays "No group selected" when no group is selected', () => {
    render(
      <BidForm
        selectedGroup={null}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
      />
    )

    expect(screen.getByText('No group selected')).toBeInTheDocument()
  })

  it('validates form before submission', async () => {
    render(
      <BidForm
        selectedGroup={null}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        minBidAmount={100000}
      />
    )

    const submitButton = screen.getByRole('button', { name: /Place Bid/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Please select a group')).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('calculates and displays total amount correctly', async () => {
    const user = userEvent.setup()
    
    render(
      <BidForm
        selectedGroup="A"
        onSubmit={mockOnSubmit}
        isSubmitting={false}
      />
    )

    const bidAmountInput = screen.getByLabelText(/Bid Amount/i)
    const quantityInput = screen.getByLabelText(/Quantity/i)

    await user.clear(bidAmountInput)
    await user.type(bidAmountInput, '500000')
    
    await user.clear(quantityInput)
    await user.type(quantityInput, '3')

    // Check total calculation (500,000 × 3 = 1,500,000)
    await waitFor(() => {
      expect(screen.getByText(/¥1,500,000/)).toBeInTheDocument()
    })
  })

  it('submits form with correct data', async () => {
    const user = userEvent.setup()
    mockOnSubmit.mockResolvedValue(undefined)
    
    render(
      <BidForm
        selectedGroup="B"
        onSubmit={mockOnSubmit}
        isSubmitting={false}
      />
    )

    const bidAmountInput = screen.getByLabelText(/Bid Amount/i)
    const quantityInput = screen.getByLabelText(/Quantity/i)

    await user.clear(bidAmountInput)
    await user.type(bidAmountInput, '750000')
    
    await user.clear(quantityInput)
    await user.type(quantityInput, '2')

    const submitButton = screen.getByRole('button', { name: /Place Bid/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        groupId: 'B',
        bidAmount: 750000,
        quantity: 2
      })
    })
  })

  it('disables submit button when submitting', () => {
    render(
      <BidForm
        selectedGroup="A"
        onSubmit={mockOnSubmit}
        isSubmitting={true}
      />
    )

    const submitButton = screen.getByRole('button', { name: /Placing Bid/i })
    expect(submitButton).toBeDisabled()
    expect(screen.getByText('Placing Bid...')).toBeInTheDocument()
  })

  it('allows quick amount selection', async () => {
    const user = userEvent.setup()
    
    render(
      <BidForm
        selectedGroup="A"
        onSubmit={mockOnSubmit}
        isSubmitting={false}
      />
    )

    const quickAmountButton = screen.getByRole('button', { name: /¥250,000/i })
    await user.click(quickAmountButton)

    const bidAmountInput = screen.getByLabelText(/Bid Amount/i) as HTMLInputElement
    expect(bidAmountInput.value).toBe('250000')
  })

  it('handles quantity increment and decrement', async () => {
    const user = userEvent.setup()
    
    render(
      <BidForm
        selectedGroup="A"
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        maxQuantity={10}
      />
    )

    const quantityInput = screen.getByLabelText(/Quantity/i) as HTMLInputElement
    const decrementButton = screen.getAllByRole('button').find(btn => 
      btn.querySelector('svg path[d="M20 12H4"]')
    )
    const incrementButton = screen.getAllByRole('button').find(btn => 
      btn.querySelector('svg path[d="M12 4v16m8-8H4"]')
    )

    expect(quantityInput.value).toBe('1')

    // Increment
    await user.click(incrementButton!)
    expect(quantityInput.value).toBe('2')

    // Decrement
    await user.click(decrementButton!)
    expect(quantityInput.value).toBe('1')

    // Should not go below 1
    await user.click(decrementButton!)
    expect(quantityInput.value).toBe('1')
  })

  it('validates minimum bid amount', async () => {
    const user = userEvent.setup()
    
    render(
      <BidForm
        selectedGroup="A"
        onSubmit={mockOnSubmit}
        isSubmitting={false}
        minBidAmount={100000}
      />
    )

    const bidAmountInput = screen.getByLabelText(/Bid Amount/i)
    await user.clear(bidAmountInput)
    await user.type(bidAmountInput, '50000')

    const submitButton = screen.getByRole('button', { name: /Place Bid/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Minimum bid amount is ¥100,000/i)).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})