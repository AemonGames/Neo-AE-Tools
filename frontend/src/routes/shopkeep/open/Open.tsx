import { For, VoidProps, createSignal } from "solid-js";
import "./open.scss";

type shopItem = {
    name : string,
    price : number
}

export default function SK_Open(){
    
    const [GetItems, SetItems] = createSignal([] as shopItem[]);
    
    
    function AddItemToList(){
        let newItem = {name: "Super Potion", price: 80};
        SetItems(old => [...old, newItem])
        
    }
    
    function RemoveItemFromList(item : shopItem){
        SetItems(old => old.filter( val => val != item))
    }

    return(
        <div class="content-container">
            <div class="shop-catalogue-container">
                <h1>Catalogue</h1>

                <table class="shop-catalogue">
                    <tbody>
                        <For each={GetItems()}>{(item, val) =>(
                            <ShopItem item={item}/> )}
                        </For>
                    </tbody>
                </table>
                
                <button onclick={AddItemToList}>
                    Add Item
                </button>
            </div>
        </div>
    )
    
    function ShopItem(props : VoidProps<{item : shopItem}>){
    
        return(
            <tr class="shop-item">
                <td class="item">{props.item.name  }</td>
                <td class="price">{props.item.price}</td>
                <td class="remove">
                    <button onclick={() => RemoveItemFromList(props.item)}>
                        X
                    </button>
                </td>
            </tr>
        )
    }
}