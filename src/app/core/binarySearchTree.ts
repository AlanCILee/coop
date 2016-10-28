import {Comparable} from "./comparable";

class Node<T extends Comparable<T>> {
	value: T;
	left: Node<T>;
	right: Node<T>;
	
	constructor(_obj: T){
		this.value = _obj;
		this.left = null;
		this.right = null;
	}
	
	toString(): void {
		console.log(this.value);
	}
}

class BinarySearchTree<T extends Comparable<T>>{
	root: Node<T> = null;
	
	addNode <T extends Comparable<T>> ( _node: Node<T>, _startNode: Node<T>): void {
		
		if( this.root == null ){
			this.root = _node;
			return;
		}
		
		if( _node.value.compareTo( _startNode.value ) <= 0) {
			if( _startNode.left == null){
				_startNode.left = _node;
			}else{
				this.addNode (_node, _startNode.left);
			}
		}else {
			if( _startNode.right == null){
				_startNode.right = _node;
			}else{
				this.addNode (_node, _startNode.right );
			}
		}
	}
	
	inOrderTraversal<T extends Comparable<T>> (_node: Node<T>){
		if(_node.left != null)
			this.inOrderTraversal( _node.left );
		
		_node.toString();
		
		if(_node.right != null)
			this.inOrderTraversal( _node.right );
	}
}

