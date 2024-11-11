import React, { useState } from 'react';

const AdminResi = () => {
   

    return (
        <div style={{width: '100%', height: '100%', position: 'relative', background: 'white'}}>
    <div style={{width: 1440, height: 90, left: 106, top: 70, position: 'absolute', background: 'white'}} />
    <div style={{width: 685, height: 46, left: 48, top: 81, position: 'absolute', color: '#666666', fontSize: 40, fontFamily: 'Abel', fontWeight: '400', lineHeight: 30, wordWrap: 'break-word'}}>GreenGrove Farms Education Platform</div>
    <div style={{width: 685, height: 46, left: 50, top: 127, position: 'absolute', color: '#666666', fontSize: 40, fontFamily: 'Abel', fontWeight: '400', lineHeight: 30, wordWrap: 'break-word'}}>Welcome [Name]!</div>
    <div style={{width: 507, height: 48, left: 699, top: 79, position: 'absolute'}}>
        <div style={{width: 507, height: 48, left: 0, top: 0, position: 'absolute', background: '#F3F9FB', borderRadius: 10}} />
        <div style={{width: 194, height: 18, left: 16, top: 15, position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div style={{width: 18, height: 18, position: 'relative', background: 'rgba(0, 0, 0, 0)'}}>
                <div style={{width: 14.07, height: 14.42, left: 2.08, top: 2.08, position: 'absolute'}}>
                    <div style={{width: 13.48, height: 13.48, left: 0, top: 0, position: 'absolute', border: '1.50px #008ECC solid'}}></div>
                    <div style={{width: 2.64, height: 2.64, left: 11.43, top: 11.78, position: 'absolute', border: '1.50px #008ECC solid'}}></div>
                </div>
            </div>
            <div style={{textAlign: 'right', color: '#666666', fontSize: 14, fontFamily: 'Abel', fontWeight: '400', lineHeight: 18, wordWrap: 'break-word'}}>Search by video or article name</div>
        </div>
        <div style={{width: 24, height: 24, left: 467, top: 12, position: 'absolute'}}>
            <img style={{width: 16, height: 15.50, left: 6, top: 4, position: 'absolute'}} src="https://via.placeholder.com/16x15" />
            <div style={{width: 2, height: 2, left: 2, top: 4, position: 'absolute', background: '#008ECC', borderRadius: 9999}} />
            <div style={{width: 2, height: 2, left: 2, top: 11, position: 'absolute', background: '#008ECC', borderRadius: 9999}} />
            <div style={{width: 2, height: 2, left: 2, top: 18, position: 'absolute', background: '#008ECC', borderRadius: 9999}} />
        </div>
    </div>
    <div style={{height: 36, left: 1241, top: 91, position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
        <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'flex'}}>
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 6, display: 'flex'}}>
                <div style={{width: 24, height: 24, position: 'relative'}}>
                    <div style={{width: 8, height: 8, left: 8, top: 4, position: 'absolute', borderRadius: 9999, border: '1.50px #008ECC solid'}} />
                    <div style={{width: 12, height: 5, left: 6, top: 16, position: 'absolute', borderRadius: 1, border: '1.50px #008ECC solid'}}></div>
                </div>
                <div style={{color: '#666666', fontSize: 16, fontFamily: 'Abel', fontWeight: '400', lineHeight: 18, wordWrap: 'break-word'}}>LOG OUT</div>
            </div>
            <div style={{width: 24, height: 0, transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px #D9D9D9 solid'}}></div>
        </div>
    </div>
    <div style={{width: 1440, height: 42, left: 48, top: 16, position: 'absolute', background: '#F5F5F5'}} />
    <div style={{left: 59, top: 30, position: 'absolute', color: '#666666', fontSize: 20, fontFamily: 'Abel', fontWeight: '400', lineHeight: 14, wordWrap: 'break-word'}}>BACK TO MAIN PAGE</div>
    <div style={{width: 1354, height: 746, left: 42, top: 225, position: 'absolute', color: 'black', fontSize: 40, fontFamily: 'Abel', fontWeight: '400', lineHeight: 30, wordWrap: 'break-word'}}>Title:<br/><br/><br/>Link:<br/><br/><br/>Description:<br/><br/><br/>Youtube ID:<br/><br/><br/>Date Added:<br/><br/><br/>Date Updated:<br/><br/><br/>Views:<br/><br/><br/><br/><br/><br/></div>
    <div style={{width: 338, height: 84, paddingLeft: 14, paddingRight: 14, paddingTop: 9, paddingBottom: 9, left: 1058, top: 887, position: 'absolute', background: '#008ECC', borderRadius: 18}} />
    <div style={{width: 331, height: 75, left: 1206, top: 1024, position: 'absolute', color: 'black', fontSize: 40, fontFamily: 'Abel', fontWeight: '400', lineHeight: 30, wordWrap: 'break-word'}}>SUBMIT!</div>
    <div style={{width: 383, height: 51, left: 1154, top: 920, position: 'absolute', color: 'white', fontSize: 48, fontFamily: 'Abel', fontWeight: '400', lineHeight: 30, wordWrap: 'break-word'}}>SUBMIT!</div>
    <div style={{paddingLeft: 14, paddingRight: 14, paddingTop: 9, paddingBottom: 9, left: 1446, top: 135, position: 'absolute', background: '#F3F9FB', borderRadius: 18, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 6, display: 'inline-flex'}}>
            <div style={{textAlign: 'right', color: '#222222', fontSize: 20, fontFamily: 'Abel', fontWeight: '400', lineHeight: 18, wordWrap: 'break-word'}}>NEWEST TO OLDEST</div>
            <div style={{width: 18, height: 18, position: 'relative', background: 'rgba(0, 0, 0, 0)'}}>
                <div style={{width: 10.50, height: 5.25, left: 3.75, top: 6.38, position: 'absolute', border: '1.50px #008ECC solid'}}></div>
            </div>
        </div>
    </div>
</div>  );
};

export default AdminResi;
