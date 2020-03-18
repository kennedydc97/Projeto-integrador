import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Produtos } from '../models/produtos';
import { Carrinho } from '../models/carrinho';



@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})

export class CarrinhoComponent implements OnInit {

  @Input() item: Produtos;

  desconto: any;
  rapido: any;
  normal: any;
  total = 0;
  qtd = 0;
  totalComDesconto: any;
  novoCarrinho: Carrinho[] = [];
  formularioQuantidade: FormGroup;
  carrinho: Carrinho[] = [];


  preco = 0;
  formularioFrete: FormGroup;
  constructor(private fb: FormBuilder) {
    this.carrinho.push(
      new Carrinho(new Produtos(1, "Bola Diamante", 3, 2.0, "Kennedy", 67), 1),
      new Carrinho(new Produtos(2, "Bola 2", 33, 2.0, "jonas", 47), 1),
      new Carrinho(new Produtos(3, "Bola 3", 9, 2.0, "fabio", 7), 1),
      new Carrinho(new Produtos(4, "Bola 4", 343, 2.0, "fabio", 67), 1),
    )
    this.calcularTotal()
    this.mostrandoQuantidade()
  }

  calcularTotal = () => {
    this.total = 0
    this.carrinho.forEach(item => {
      this.total += item.produto.preco * item.quantidade;
      if (this.total != 0) {
        this.carrinho.forEach(item => {
          this.desconto = (this.total * 0.7).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        })
      }
    })
    this.totalComDesconto = (this.total - (this.total * 0.7)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return this.totalComDesconto
  }

  freteR = () => {
    this.frete = (50).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    this.totalComDesconto = (this.total - (this.total * 0.7) + 50).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return 50
  }
  freteN = () => {
    this.frete = (20).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    this.totalComDesconto = (this.total - (this.total * 0.7) + 20).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return 20
  }



  frete: any
  quantidade: number;

  criandoFormulario() {
    this.formularioQuantidade = this.fb.group({
      quantidade: []
    })
    this.formularioFrete = this.fb.group({
      frete: []
    })
    // 
  }

  ngOnInit(): void {
    this.criandoFormulario();
  }

  mostrandoQuantidade() {
    this.qtd = 0;
    this.carrinho.forEach(item => {
      this.qtd += item.quantidade;
    })
  }

  ajustarQuantidade(produto) {
    let item: Carrinho = this.carrinho.find(x => x.produto.id == produto.produto.id);
    item.quantidade = parseInt(this.formularioQuantidade.value.quantidade);


    this.calcularTotal();
    this.mostrandoQuantidade();
 
  }

  excluirProduto(produto) {
    this.carrinho = this.carrinho.filter(item => item.produto != produto);
    this.calcularTotal();
    this.mostrandoQuantidade();
  }

}