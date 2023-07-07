import React from 'react';

function MyItems(props) {
  console.log('myitems props are:', props);

  const dateString = props.tdate;
  const date = new Date(dateString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const localDate = date.toLocaleDateString(undefined, options);

  return (
    <div className="items-cont" style={{marginLeft:'20px'}}>
      {/* item begins here */}
      <div className="row" >
        <div className="col-md" >
          <div className="item" >
            <div className="card" >
              <div className="image-container"  >
                <img
                  src="assets/img/avatar.jpg"
                  alt="images"
                  style={{ width: '150px', height: '150px', padding: '0', margin: '0.5rem 2rem' }}

                />
              </div>
              <div>
                <center>
                  <h6>Jungle Rummy</h6>
                </center>
                <button
                  className="button-like-text text-white"
                  style={{ fontSize: '15px', width: '150px', marginLeft: '1.5rem', padding: '0px' }}
                >
                  2300 snaps
                </button>
                <p style={{ color: '#48e0a4' }}>Transaction ID: {props.tId}</p>
                <p style={{ color: '#48e0a4', marginTop: '-30px' }}>Date: {localDate}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Repeat the above card code two more times to create three cards per row */}
      </div>
    </div>
  );
}

export default MyItems;