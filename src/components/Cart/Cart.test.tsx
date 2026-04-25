import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Cart } from './Cart'
import { mockCartItems } from '../../data/products'

/**
 * Exercício 2 — Cart
 *
 * Nível de dificuldade: Avançado (scaffolding mínimo)
 * Apenas as descrições estão prontas. Você escreve tudo: render, queries e assertions.
 *
 * Conceitos praticados:
 *  - render() com props complexas
 *  - Queries semânticas
 *  - Verificação de estado calculado (total)
 *  - Assertions negativas
 *  - Mock functions + toHaveBeenCalledWith()
 *
 * Dados úteis (mockCartItems):
 *  - Camiseta Básica  → R$ 49,90 × 2 = R$ 99,80
 *  - Tênis Esportivo  → R$ 199,90 × 1 = R$ 199,90
 *  - Total esperado   → R$ 299,70
 */

describe('Cart', () => {
  it('exibe a mensagem "Seu carrinho está vazio" quando não há itens', () => {
    render(<Cart items={[]} onRemove={jest.fn()} />)

  // verifica se a mensagem de carrinho vazio está na tela
  expect(screen.getByText(/seu carrinho está vazio/i)).toBeInTheDocument()
    // TODO: renderize o Cart com items={[]} e onRemove={jest.fn()}
    // e verifique que a mensagem de carrinho vazio está na tela
  })

  it('renderiza todos os itens do carrinho', () => {
    // renderiza o Cart com os itens mockados
  render(<Cart items={mockCartItems} onRemove={jest.fn()} />)

  // verifica se os nomes dos dois produtos aparecem
  expect(screen.getByText(/camiseta básica/i)).toBeInTheDocument()
  expect(screen.getByText(/tênis esportivo/i)).toBeInTheDocument()
    // TODO: renderize o Cart com mockCartItems
    // e verifique que os nomes dos dois produtos aparecem na tela
  })

  it('exibe o total correto somando os itens', () => {
    // renderiza o Cart com os itens que somam R$ 299,70
  render(<Cart items={mockCartItems} onRemove={jest.fn()} />)

  // verifica se o total calculado aparece corretamente
  expect(screen.getByText(/total:\s*R\$\s?299,70/i)).toBeInTheDocument()

    // TODO: renderize o Cart com mockCartItems
    // e verifique que o total "R$\xa0299,70" aparece na tela
  })

  it('chama onRemove com o id correto ao clicar em "Remover"', async () => {
    // cria um mock para capturar a chamada de remoção
  const onRemove = jest.fn()
  render(<Cart items={mockCartItems} onRemove={onRemove} />)

  // clica no primeiro botão Remover no carrinho
  await userEvent.click(screen.getAllByRole('button', { name: /remover/i })[0])

  // verifica que onRemove foi chamado com o id do primeiro produto
  expect(onRemove).toHaveBeenCalledWith(1)
    // TODO: crie um mock para onRemove
    // renderize o Cart com mockCartItems e o mock
    // clique no botão "Remover" do primeiro item (Camiseta Básica, id=1)
    // e verifique que onRemove foi chamado com o id correto
  })

  it('não exibe o total quando o carrinho está vazio', () => {
    // renderiza o Cart sem itens
  render(<Cart items={[]} onRemove={jest.fn()} />)

  // verifica que não existe texto de total na página
  expect(screen.queryByText(/total:/i)).not.toBeInTheDocument()
    // TODO: renderize o Cart com items={[]}
    // e use uma assertion *negativa* para verificar que nenhum texto de "Total" aparece
  })
})
