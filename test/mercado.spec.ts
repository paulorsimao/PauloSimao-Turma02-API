import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('API Mercado', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com/docs';
  let mercadoId = '';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  // Criar mercado
  describe('Criação de novo Mercado', () => {
    it('Cria um novo mercado', async () => {
      mercadoId = await p
        .spec()
        .post(${baseUrl}/mercado)
        .withJson({
          nome: 'MercadinhoTeste',
          cnpj: '12345678000199',
          endereco: 'Rua 123321'
        })
        .expectStatus(StatusCodes.OK)
        .returns('mercadoId');
    });
  });

  // Adiciona salgados
  describe('Adicionar um novo salgado ao mercado', () => {
    it('Adiciona um produto salgado a padaria', async () => {
      await p
        .spec()
        .post(${baseUrl}/mercado/${mercadoId}/produtos/padaria/salgados)
        .withJson({
          nome: 'Coxinha',
          valor: 4
        })
        .expectStatus(StatusCodes.OK);
    });
  });

  // Verifica quantidade de salgados
  describe('Verificar produtos salgados no mercado', () => {
    it('Verifica se o salgado adicionado está na padaria', async () => {
      await p
        .spec()
        .get(${baseUrl}/mercado/${mercadoId}/produtos/padaria/salgados)
        .expectStatus(StatusCodes.OK);
    });
  });

  // Adiciona legumes
  describe('Adicionar um novo legume ao mercado', () => {
    it('Adiciona um novo legume no hortifruti', async () => {
      await p
        .spec()
        .post(${baseUrl}/mercado/${mercadoId}/produtos/hortifruit/legumes)
        .withJson({
          nome: 'Beringeja',
          valor: 10
        })
        .expectStatus(StatusCodes.OK);
    });
  });

  // Remove mercado
  describe('Remover o mercado', () => {
    it('Exclui o mercado criado com o ID', async () => {
      await p
        .spec()
        .delete(${baseUrl}/mercado/${mercadoId})
        .expectStatus(StatusCodes.OK);
    });
  });
});