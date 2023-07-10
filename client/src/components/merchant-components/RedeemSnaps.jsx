import React from 'react'
import {Link} from 'react-router-dom'

const RedeemSnaps = () => {
  return (
     <div class="row mt-lg-5 mt-3 text-left">			
        <div class="main_title version_2">
            <span><em></em></span>
            <h2>Redeem Snappcoins</h2>
        </div>

        <div class="row">
            <div class="col-md-6">
                    <div class="form-group">
                    <label>Enter Snaps</label>
                    <input type="text" class="form-control" placeholder="500 snappcoins" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label>Amount Collected</label>
                    <div class="box_bid">
                        <div class="item_meta"> 
                            <h3 class=""><strong>$ 1000</strong></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center form-group"><Link to="#" class="btn_1 medium pulse_bt">Continue to Payment Gateway</Link></div>
    </div>
  )
}

export default RedeemSnaps
